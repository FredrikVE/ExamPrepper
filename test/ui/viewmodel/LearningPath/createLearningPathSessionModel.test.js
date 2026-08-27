// test/ui/viewmodel/LearningPath/createLearningPathSessionModel.test.js
import { describe, expect, test } from "@jest/globals";

import createLearningPathSessionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js";

const t = {
	learningPathSessionLabel: (position) => `Session ${position}`,
	learningPathSessionQuestionCount: (count) => `${count} questions`,
	learningPathSessionCompletedLabel: "Completed",
	learningPathSessionCurrentLabel: "Next",
	learningPathSessionAvailableLabel: "Ready",
	learningPathStatusLocked: "Locked",
	learningPathSessionScoreLabel: (position, percentage) => `Session ${position}: ${percentage}% result`,
	learningPathSessionNotAssessedScoreLabel: (position) => `Session ${position}: not assessed`,
	learningPathSessionOpenLabel: (position) => `Start session ${position}`
};

function session(overrides = {}) {
	return {
		planKey: "plan-1",
		position: 1,
		questionCount: 6,
		status: "completed",
		performancePercent: 65.38,
		performanceBand: "progress",
		isStartable: true,
		...overrides
	};
}

function options(overrides = {}) {
	return {
		session: session(),
		moduleId: "module-1",
		startingActionKey: null,
		canStartLearningSessions: true,
		t,
		...overrides
	};
}

describe("createLearningPathSessionModel", () => {
	test("uses a score donut model for a completed assessed session", () => {
		const model = createLearningPathSessionModel(options());

		expect(model).toMatchObject({
			iconKey: "score",

			scoreModel: {
				percentage: 65.38,
				displayValue: "65%",
				appearance: "progress"
			}
		});
	});

	test("uses a score donut for exact and rounded 100 percent displays", () => {
		const perfect = createLearningPathSessionModel(
			options({
				session: session({
					performancePercent: 100,
					performanceBand: "understood"
				})
			})
		);

		expect(perfect).toMatchObject({
			iconKey: "score",

			scoreModel: {
				percentage: 100,
				displayValue: "100%",
				appearance: "understood"
			}
		});

		const rounded = createLearningPathSessionModel(
			options({
				session: session({
					performancePercent: 99.6,
					performanceBand: "understood"
				})
			})
		);

		expect(rounded).toMatchObject({
			iconKey: "score",

			scoreModel: {
				displayValue: "100%"
			}
		});
	});

	test("keeps backend selectability while auth disables the runtime action", () => {
		const model = createLearningPathSessionModel(
			options({
				canStartLearningSessions: false
			})
		);

		expect(model).toMatchObject({
			isSelectable: true,

			actionModel: {
				isDisabled: true
			}
		});
	});

	test("marks only the matching session action as pending", () => {
		const pending = createLearningPathSessionModel(
			options({
				startingActionKey: "module:module-1:session:plan-1"
			})
		);

		const other = createLearningPathSessionModel(
			options({
				session: session({
					planKey: "plan-2",
					position: 2
				}),

				startingActionKey: "module:module-1:session:plan-1"
			})
		);

		expect(pending.actionModel).toMatchObject({
			isDisabled: true,
			isPending: true
		});

		expect(other.actionModel).toMatchObject({
			isDisabled: true,
			isPending: false
		});
	});

	test("fails fast for an unknown session status", () => {
		const createModel = () => {
			return createLearningPathSessionModel(
				options({
					session: session({
						status: "unknown"
					})
				})
			);
		};

		expect(createModel).toThrow(
			"Unknown LearningPath session status 'unknown'"
		);
	});

	test("takes selectability directly from backend isStartable", () => {
		const selectable = createLearningPathSessionModel(options());

		expect(selectable).toMatchObject({
			isSelectable: true,

			actionModel: {
				actionKey: "module:module-1:session:plan-1",

				target: {
					kind: "session",
					planKey: "plan-1"
				}
			}
		});

		const locked = createLearningPathSessionModel(
			options({
				session: session({
					status: "locked",
					performancePercent: null,
					performanceBand: "not-assessed",
					isStartable: false
				})
			})
		);

		expect(locked).toMatchObject({
			iconKey: "lock",
			isSelectable: false,
			actionModel: null
		});
	});
});