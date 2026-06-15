// test/integration/examFlow.integration.test.js
import { beforeAll, describe, expect, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";
import ExamFlowApiTestAssertions from "./support/ExamFlowApiTestAssertions.js";
import ExamFlowApiTestContext from "./support/ExamFlowApiTestContext.js";
import { EXPECTED_ENGLISH_EXAM_IDS, EXPECTED_NORWEGIAN_EXAM_IDS } from "./support/examFlowApiTestData.js";

const shouldRunApiIntegrationTests = process.env.RUN_API_INTEGRATION_TESTS === "true";
const examFlowApiDescribe = shouldRunApiIntegrationTests ? describe : describe.skip;

examFlowApiDescribe("exam flow API integration", () => {
	const context = new ExamFlowApiTestContext();
	const assertions = new ExamFlowApiTestAssertions();

	beforeAll(async () => {
		await context.load();
	});

	test("loads visible subjects with exam counts from API", async () => {
		const subjects = await context.loadSubjects("no");
		const in5431Subject = assertions.getSubjectById(subjects, "in5431");

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
		assertions.expectExamIds(exams, EXPECTED_NORWEGIAN_EXAM_IDS);
		assertions.expectEveryExamHasQuestions(exams);
	});

	test("loads available English exams for IN5431 from API", async () => {
		const exams = await context.loadExams("in5431", "en");

		expect(exams).toHaveLength(11);
		assertions.expectExamIds(exams, EXPECTED_ENGLISH_EXAM_IDS);
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

		const fillQuestion = assertions.getQuestionByType(questions, QUESTION_TYPES.FILL);
		const multipleChoiceQuestion = assertions.getQuestionByType(questions, QUESTION_TYPES.MULTI);
		const singleChoiceQuestion = assertions.getQuestionByType(questions, QUESTION_TYPES.SINGLE);

		const fillAnswer = context.buildCorrectAnswer(fillQuestion);
		const multipleChoiceAnswer = context.buildCorrectAnswer(multipleChoiceQuestion);
		const singleChoiceAnswer = context.buildCorrectAnswer(singleChoiceQuestion);

		expect(context.gradeAnswer(fillQuestion, fillAnswer)).toBe(true);
		expect(context.gradeAnswer(multipleChoiceQuestion, multipleChoiceAnswer)).toBe(true);
		expect(context.gradeAnswer(singleChoiceQuestion, singleChoiceAnswer)).toBe(true);
	});

	test("loads explanation text from API", async () => {
		const questions = await context.loadQuestions("mock-exam-1-en");
		const fillQuestion = assertions.getQuestionByType(questions, QUESTION_TYPES.FILL);
		const multipleChoiceQuestion = assertions.getQuestionByType(questions, QUESTION_TYPES.MULTI);
		const optionWithExtendedExplanation = assertions.getOptionWithExtendedExplanation(multipleChoiceQuestion.options);

		expect(fillQuestion.whyCorrect).toContain("business process");
		expect(fillQuestion.whyWrong).toContain("workflow");
		expect(optionWithExtendedExplanation.why).toEqual(expect.any(String));
		expect(optionWithExtendedExplanation.whyExtended.length).toBeGreaterThan(0);
	});

	test("grades Autonomy and alignment matrix questions from API", async () => {
		const examIds = [
			"mock-exam-drag-categorize-no",
			"mock-exam-drag-categorize-en"
		];

		for (const examId of examIds) {
			const questions = await context.loadQuestions(examId);
			const question = assertions.getQuestionByTitle(questions, "Autonomy and alignment");

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