// test/integration/examFlow.integration.test.js
import { beforeAll, describe, expect, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";

const shouldRunApiIntegrationTests = process.env.RUN_API_INTEGRATION_TESTS === "true";
const examFlowApiDescribe = shouldRunApiIntegrationTests ? describe : describe.skip;

class ExamFlowApiTestContext {
	calculateExamScoreUseCase = null;
	getAvailableExamsUseCase = null;
	getAvailableSubjectsUseCase = null;
	getExamByBaseIdAndLangUseCase = null;
	getExamQuestionsUseCase = null;
	getSubjectByIdUseCase = null;
	gradeAnswerUseCase = null;

	correctAnswerBuilder = new CorrectAnswerBuilder();

	async load() {
		this.configureEnvironment();

		const dependencies = await import("../../src/di/dependencies.js");

		this.calculateExamScoreUseCase = dependencies.calculateExamScoreUseCase;
		this.getAvailableExamsUseCase = dependencies.getAvailableExamsUseCase;
		this.getAvailableSubjectsUseCase = dependencies.getAvailableSubjectsUseCase;
		this.getExamByBaseIdAndLangUseCase = dependencies.getExamByBaseIdAndLangUseCase;
		this.getExamQuestionsUseCase = dependencies.getExamQuestionsUseCase;
		this.getSubjectByIdUseCase = dependencies.getSubjectByIdUseCase;
		this.gradeAnswerUseCase = dependencies.gradeAnswerUseCase;
	}

	configureEnvironment() {
		process.env.VITE_API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000/api";
		process.env.VITE_IMAGE_BASE_URL = process.env.VITE_IMAGE_BASE_URL || "http://localhost:3000";
	}

	async loadSubjects(language) {
		const result = await this.getAvailableSubjectsUseCase.execute({ language });
		return result.subjects;
	}

	async loadExams(subjectId, language) {
		return this.getAvailableExamsUseCase.execute({
			subjectId,
			language
		});
	}

	async loadQuestions(examId) {
		return this.getExamQuestionsUseCase.execute(examId);
	}

	async loadTranslatedExam(baseId, language) {
		return this.getExamByBaseIdAndLangUseCase.execute({
			baseId,
			lang: language
		});
	}

	async loadSubject(subjectId, language) {
		return this.getSubjectByIdUseCase.execute({
			subjectId,
			language
		});
	}

	calculateScore(questions, answersByQuestionId) {
		return this.calculateExamScoreUseCase.execute(questions, answersByQuestionId);
	}

	gradeAnswer(question, answer) {
		return this.gradeAnswerUseCase.execute(question, answer);
	}

	getQuestionScore(question, answer) {
		return this.gradeAnswerUseCase.getQuestionScore(question, answer);
	}

	buildCorrectAnswersByQuestionId(questions) {
		const answersByQuestionId = {};

		for (const question of questions) {
			answersByQuestionId[question.id] = this.correctAnswerBuilder.build(question);
		}

		return answersByQuestionId;
	}

	buildCorrectAnswer(question) {
		return this.correctAnswerBuilder.build(question);
	}
}

class CorrectAnswerBuilder {
	build(question) {
		if (question.type === QUESTION_TYPES.SINGLE) {
			return this.buildSingleChoiceAnswer(question);
		}

		if (question.type === QUESTION_TYPES.MULTI) {
			return this.buildMultipleChoiceAnswer(question);
		}

		if (question.type === QUESTION_TYPES.FILL) {
			return this.buildFillAnswer(question);
		}

		if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
			return this.buildMatrixPlacementAnswer(question);
		}

		return undefined;
	}

	buildSingleChoiceAnswer(question) {
		const options = question.options || [];

		for (let optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
			const option = options[optionIndex];

			if (option.correct === true) {
				return optionIndex;
			}
		}

		return undefined;
	}

	buildMultipleChoiceAnswer(question) {
		const correctOptionIndexes = [];
		const options = question.options || [];

		for (let optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
			const option = options[optionIndex];

			if (option.correct === true) {
				correctOptionIndexes.push(optionIndex);
			}
		}

		return correctOptionIndexes;
	}

	buildFillAnswer(question) {
		if (question.answers && question.answers.length > 0) {
			return question.answers[0];
		}

		if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
			return question.acceptedAnswers[0];
		}

		return undefined;
	}

	buildMatrixPlacementAnswer(question) {
		const answerByItemId = {};
		const items = question.items || [];

		for (const item of items) {
			answerByItemId[item.id] = item.correctQuadrantId || item.quadrantId;
		}

		return answerByItemId;
	}
}

class ExamFlowApiTestAssertions {
	findSubjectById(subjects, subjectId) {
		for (const subject of subjects) {
			if (subject.id === subjectId) {
				return subject;
			}
		}

		return null;
	}

	findQuestionByType(questions, questionType) {
		for (const question of questions) {
			if (question.type === questionType) {
				return question;
			}
		}

		return null;
	}

	findQuestionByTitle(questions, questionTitle) {
		for (const question of questions) {
			if (question.title === questionTitle) {
				return question;
			}
		}

		return null;
	}

	expectExamIds(exams, expectedExamIds) {
		const actualExamIds = [];

		for (const exam of exams) {
			actualExamIds.push(exam.id);
		}

		expect(actualExamIds).toEqual(expectedExamIds);
	}

	expectEveryExamHasQuestions(exams) {
		for (const exam of exams) {
			expect(exam.questionCount).toBeGreaterThan(0);
		}
	}
}

examFlowApiDescribe("exam flow API integration", () => {
	const context = new ExamFlowApiTestContext();
	const assertions = new ExamFlowApiTestAssertions();

	beforeAll(async () => {
		await context.load();
	});

	test("loads visible subjects with exam counts from API", async () => {
		const subjects = await context.loadSubjects("no");
		const in5431Subject = assertions.findSubjectById(subjects, "in5431");

		expect(subjects.length).toBeGreaterThan(0);
		expect(in5431Subject).toMatchObject({
			code: "IN5431",
			examCount: 12,
			isVisible: true
		});
	});

	test("loads available Norwegian exams for IN5431 from API", async () => {
		const exams = await context.loadExams("in5431", "no");

		expect(exams).toHaveLength(12);

		assertions.expectExamIds(exams, [
			"in5431-demo-no",
			"mock-exam-1-no",
			"mock-exam-2-no",
			"mock-exam-3-no",
			"mock-exam-4a-no",
			"mock-exam-4b-no",
			"mock-exam-5-no",
			"mock-exam-definitions-no",
			"mock-exam-drag-categorize-no",
			"mock-exam-sustainability-no",
			"mock-exam-digital-strategy-no",
			"mock-exam-digital-transformation-no"
		]);

		assertions.expectEveryExamHasQuestions(exams);
	});

	test("loads available English exams for IN5431 from API", async () => {
		const exams = await context.loadExams("in5431", "en");

		expect(exams).toHaveLength(11);

		assertions.expectExamIds(exams, [
			"mock-exam-1-en",
			"mock-exam-2-en",
			"mock-exam-3-en",
			"mock-exam-4a-en",
			"mock-exam-4b-en",
			"mock-exam-5-en",
			"mock-exam-definitions-en",
			"mock-exam-drag-categorize-en",
			"mock-exam-sustainability-en",
			"mock-exam-digital-strategy-en",
			"mock-exam-digital-transformation-en"
		]);

		assertions.expectEveryExamHasQuestions(exams);
	});

	test("loads questions and calculates full score when all answers are correct", async () => {
		const questions = await context.loadQuestions("mock-exam-1-no");
		const answersByQuestionId = context.buildCorrectAnswersByQuestionId(questions);

		const result = context.calculateScore(questions, answersByQuestionId);

		expect(questions).toHaveLength(25);
		expect(result).toEqual({
			score: 25,
			totalPoints: 25,
			percentage: 100
		});
	});

	test("grades actual question examples from API", async () => {
		const questions = await context.loadQuestions("mock-exam-1-en");

		const fillQuestion = assertions.findQuestionByType(questions, QUESTION_TYPES.FILL);
		const multipleChoiceQuestion = assertions.findQuestionByType(questions, QUESTION_TYPES.MULTI);
		const singleChoiceQuestion = assertions.findQuestionByType(questions, QUESTION_TYPES.SINGLE);

		const fillAnswer = context.buildCorrectAnswer(fillQuestion);
		const multipleChoiceAnswer = context.buildCorrectAnswer(multipleChoiceQuestion);
		const singleChoiceAnswer = context.buildCorrectAnswer(singleChoiceQuestion);

		expect(context.gradeAnswer(fillQuestion, fillAnswer)).toBe(true);
		expect(context.gradeAnswer(multipleChoiceQuestion, multipleChoiceAnswer)).toBe(true);
		expect(context.gradeAnswer(singleChoiceQuestion, singleChoiceAnswer)).toBe(true);
	});

	test("grades Autonomy and alignment matrix questions from API", async () => {
		const examIds = [
			"mock-exam-drag-categorize-no",
			"mock-exam-drag-categorize-en"
		];

		for (const examId of examIds) {
			const questions = await context.loadQuestions(examId);
			const question = assertions.findQuestionByTitle(questions, "Autonomy and alignment");

			expect(question).toMatchObject({
				type: QUESTION_TYPES.MATRIX_PLACEMENT,
				points: 4
			});

			expect(question.moduleId).toEqual(expect.any(String));
			expect(question.groupId).toEqual(expect.any(String));
			expect(question.items).toHaveLength(4);

			const answer = context.buildCorrectAnswer(question);

			expect(context.gradeAnswer(question, answer)).toBe(true);
			expect(context.getQuestionScore(question, answer)).toBe(4);
		}
	});

	test("finds translated exam by base id and lang", async () => {
		const exam = await context.loadTranslatedExam("mock-exam-1", "en");

		expect(exam).toMatchObject({
			id: "mock-exam-1-en",
			baseId: "mock-exam-1",
			lang: "en"
		});
	});

	test("finds subject by id with exam count", async () => {
		const subject = await context.loadSubject("in5431", "en");

		expect(subject).toMatchObject({
			id: "in5431",
			code: "IN5431",
			examCount: 11
		});
	});
});