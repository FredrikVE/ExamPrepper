// test/ui/viewmodel/LearningSession/LearningSessionPagePresentation.test.js
import { describe, expect, jest, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../../src/i18n/translations.js";
import createLearningSessionPagePresentation from "../../../../src/ui/viewmodel/LearningSession/LearningSessionPagePresentation.js";
import { LEARNING_SESSION_STATES } from "../../../../src/ui/viewmodel/LearningSession/LearningSessionStates.js";

const t = translations[LANGUAGES.EN];

function createSession(overrides = {}) {
	return {
		sessionId: "session-1",
		moduleId: "module-1",
		modulePosition: 2,
		moduleTitle: "Protocols",
		matchCardsTask: {
			pairs: [
				{ glossaryEntryKey: "glossary-a" },
				{ glossaryEntryKey: "glossary-b" }
			]
		},
		matchCardResults: [
			{ glossaryEntryKey: "glossary-a", wrongAttemptCount: 0 },
			{ glossaryEntryKey: "glossary-b", wrongAttemptCount: 1 }
		],
		questions: [
			{
				sessionQuestionId: "session-question-1",
				question: {
					id: "question-1",
					type: "fill"
				}
			}
		],
		currentIndex: 0,
		answersBySessionQuestionId: {},
		resultsBySessionQuestionId: {},
		combo: 0,
		xp: 0,
		pendingRewardKind: null,
		...overrides
	};
}

function createPresentation(overrides = {}) {
	const checkAnswer = jest.fn();
	const continueSession = jest.fn();
	const submitSession = jest.fn();
	const backContract = { onBack: jest.fn() };
	const session = overrides.session === undefined
		? createSession()
		: overrides.session;
	const state = overrides.state ?? {
		status: LEARNING_SESSION_STATES.ANSWERING,
		session
	};
	const currentQuestion = overrides.currentQuestion === undefined
		? session?.questions[0] ?? null
		: overrides.currentQuestion;

	return createLearningSessionPagePresentation({
		session,
		state,
		currentQuestion,
		currentResult: overrides.currentResult ?? null,
		answer: overrides.answer ?? null,
		isLastQuestion: overrides.isLastQuestion ?? true,
		isMatchCardsActive: overrides.isMatchCardsActive ?? false,
		isMatchCardsPhaseComplete: overrides.isMatchCardsPhaseComplete ?? true,
		answerReady: overrides.answerReady ?? true,
		feedbackBody: overrides.feedbackBody ?? null,
		setSingleAnswer: jest.fn(),
		toggleMultiAnswer: jest.fn(),
		selectObjectAnswer: jest.fn(),
		checkAnswer,
		continueSession,
		submitSession,
		backContract,
		t,
		...overrides.presentationOverrides
	});
}

describe("createLearningSessionPagePresentation", () => {
	test("returns an empty presentation before the session is loaded", () => {
		expect(createPresentation({ session: null })).toEqual({
			headerModel: null,
			questionCardModel: null,
			actionPanelModel: null,
			sessionResultModel: null,
			rewardModel: null
		});
	});

	test("presents MatchCards without question actions while the phase is active", () => {
		const presentation = createPresentation({
			isMatchCardsActive: true,
			isMatchCardsPhaseComplete: false
		});

		expect(presentation.headerModel.counterLabel).toBe(t.learningSessionMatchCardsCounter);
		expect(presentation.questionCardModel).toBeNull();
		expect(presentation.actionPanelModel).toBeNull();
	});

	test("presents checked question feedback through the public page contract", () => {
		const presentation = createPresentation({
			currentResult: {
				isCorrect: true,
				fillMatchType: "fuzzy"
			}
		});

		expect(presentation.questionCardModel).toMatchObject({
			questionNumber: 1,
			answerOptionOrder: null,
			submitted: true,
			showAllFeedback: true,
			correct: true,
			fillMatchType: "fuzzy"
		});
		expect(presentation.actionPanelModel).toMatchObject({
			feedbackAppearance: "correct",
			feedbackTitle: t.learningSessionCorrectTitle,
			primaryLabel: t.learningSessionFinishLabel,
			primaryAppearance: "success",
			isPrimaryDisabled: false
		});
	});

	test("keeps submit failure as an interaction retry action", () => {
		const presentation = createPresentation({
			state: {
				status: LEARNING_SESSION_STATES.SUBMIT_FAILED,
				session: createSession(),
				errorMessage: "Submit failed"
			},
			feedbackBody: "Submit failed"
		});

		expect(presentation.actionPanelModel).toMatchObject({
			feedbackBody: "Submit failed",
			primaryLabel: t.learningSessionRetryLabel,
			isPrimaryDisabled: false
		});
	});

	test("presents pending combo reward from session interaction state", () => {
		const presentation = createPresentation({
			session: createSession({
				pendingRewardKind: "combo",
				combo: 3,
				xp: 40
			})
		});

		expect(presentation.rewardModel).toMatchObject({
			comboValue: "3",
			xpValue: "40 XP"
		});
	});

	test("uses backend performance band for the completed result", () => {
		const session = createSession();
		const presentation = createPresentation({
			session,
			state: {
				status: LEARNING_SESSION_STATES.COMPLETED,
				session,
				result: {
					score: {
						earnedPoints: 6,
						availablePoints: 10,
						percentage: 60,
						performanceBand: "progress"
					}
				}
			}
		});

		expect(presentation.sessionResultModel).toMatchObject({
			appearance: "progress",
			title: t.learningSessionResultProgressTitle,
			scoreValue: "60 %"
		});
		expect(presentation.actionPanelModel).toBeNull();
	});

	test("fails fast for unknown reward and performance vocabulary", () => {
		expect(() => createPresentation({
			session: createSession({ pendingRewardKind: "unexpected" })
		})).toThrow("Unknown learning session reward kind: unexpected");

		const session = createSession();
		expect(() => createPresentation({
			session,
			state: {
				status: LEARNING_SESSION_STATES.COMPLETED,
				session,
				result: {
					score: {
						earnedPoints: 4,
						availablePoints: 10,
						percentage: 40,
						performanceBand: "unexpected"
					}
				}
			}
		})).toThrow("Unknown learning session performance band: unexpected");
	});
});
