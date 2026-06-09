// test/integration/examFlow.integration.test.js
import { beforeAll, describe, expect, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";

const runApiIntegrationTests = process.env.RUN_API_INTEGRATION_TESTS === "true";
const describeApiIntegration = runApiIntegrationTests ? describe : describe.skip;

class ExamFlowApiTestContext {
    #calculateExamScoreUseCase;
    #getAvailableExamsUseCase;
    #getAvailableSubjectsUseCase;
    #getExamByBaseIdAndLangUseCase;
    #getExamQuestionsUseCase;
    #getSubjectByIdUseCase;
    #gradeAnswerUseCase;

    async load() {
        this.#configureEnvironment();

        const dependencies = await import("../../src/di/dependencies.js");

        this.#calculateExamScoreUseCase = dependencies.calculateExamScoreUseCase;
        this.#getAvailableExamsUseCase = dependencies.getAvailableExamsUseCase;
        this.#getAvailableSubjectsUseCase = dependencies.getAvailableSubjectsUseCase;
        this.#getExamByBaseIdAndLangUseCase = dependencies.getExamByBaseIdAndLangUseCase;
        this.#getExamQuestionsUseCase = dependencies.getExamQuestionsUseCase;
        this.#getSubjectByIdUseCase = dependencies.getSubjectByIdUseCase;
        this.#gradeAnswerUseCase = dependencies.gradeAnswerUseCase;
    }

    get calculateExamScoreUseCase() {
        return this.#requireLoaded(this.#calculateExamScoreUseCase, "calculateExamScoreUseCase");
    }

    get getAvailableExamsUseCase() {
        return this.#requireLoaded(this.#getAvailableExamsUseCase, "getAvailableExamsUseCase");
    }

    get getAvailableSubjectsUseCase() {
        return this.#requireLoaded(this.#getAvailableSubjectsUseCase, "getAvailableSubjectsUseCase");
    }

    get getExamByBaseIdAndLangUseCase() {
        return this.#requireLoaded(this.#getExamByBaseIdAndLangUseCase, "getExamByBaseIdAndLangUseCase");
    }

    get getExamQuestionsUseCase() {
        return this.#requireLoaded(this.#getExamQuestionsUseCase, "getExamQuestionsUseCase");
    }

    get getSubjectByIdUseCase() {
        return this.#requireLoaded(this.#getSubjectByIdUseCase, "getSubjectByIdUseCase");
    }

    get gradeAnswerUseCase() {
        return this.#requireLoaded(this.#gradeAnswerUseCase, "gradeAnswerUseCase");
    }

    #configureEnvironment() {
        process.env.VITE_API_BASE_URL ??= "http://localhost:3000/api";
        process.env.VITE_IMAGE_BASE_URL ??= "http://localhost:3000";
    }

    #requireLoaded(value, name) {
        if (!value) {
            throw new Error(`ExamFlowApiTestContext was used before load(): ${name}`);
        }

        return value;
    }
}

function buildCorrectAnswer(question) {
    if (question.type === QUESTION_TYPES.SINGLE) {
        return question.options.findIndex((option) => option.correct);
    }

    if (question.type === QUESTION_TYPES.MULTI) {
        return question.options
            .map((option, index) => option.correct ? index : null)
            .filter((index) => index !== null);
    }

    if (question.type === QUESTION_TYPES.FILL) {
        return question.answers[0];
    }

    if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
        return Object.fromEntries(
            (question.items ?? []).map((item) => [item.id, item.correctQuadrantId ?? item.quadrantId])
        );
    }

    return undefined;
}

describeApiIntegration("exam flow API integration", () => {
    const context = new ExamFlowApiTestContext();

    beforeAll(async () => {
        await context.load();
    });

    test("loads visible subjects with exam counts from API", async () => {
        const result = await context.getAvailableSubjectsUseCase.execute({ language: "no" });

        const in5431 = result.subjects.find((subject) => subject.id === "in5431");

        expect(result.subjects.length).toBeGreaterThan(0);
        expect(in5431).toMatchObject({
            code: "IN5431",
            examCount: 11,
            isVisible: true
        });
    });

    test("loads available Norwegian exams for IN5431 from API", async () => {
        const exams = await context.getAvailableExamsUseCase.execute({
            subjectId: "in5431",
            language: "no"
        });

        expect(exams).toHaveLength(11);
        expect(exams.map((exam) => exam.id)).toEqual([
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
            "mock-exam-digital-transformation-no",
        ]);
        expect(exams.every((exam) => exam.questionCount > 0)).toBe(true);
    });

    test("loads available English exams for IN5431 from API", async () => {
        const exams = await context.getAvailableExamsUseCase.execute({
            subjectId: "in5431",
            language: "en"
        });

        expect(exams).toHaveLength(11);
        expect(exams.map((exam) => exam.id)).toEqual([
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
            "mock-exam-digital-transformation-en",
        ]);
        expect(exams.every((exam) => exam.questionCount > 0)).toBe(true);
    });

    test("loads questions and calculates full score when all answers are correct", async () => {
        const questions = await context.getExamQuestionsUseCase.execute("mock-exam-1-no");
        const answers = Object.fromEntries(
            questions.map((question) => [question.id, buildCorrectAnswer(question)])
        );

        const result = context.calculateExamScoreUseCase.execute(questions, answers);

        expect(questions).toHaveLength(25);
        expect(result).toEqual({
            score: 25,
            totalPoints: 25,
            percentage: 100
        });
    });

    test("grades actual question examples from API", async () => {
        const questions = await context.getExamQuestionsUseCase.execute("mock-exam-1-en");
        const fillQuestion = questions.find((question) => question.type === QUESTION_TYPES.FILL);
        const multiQuestion = questions.find((question) => question.type === QUESTION_TYPES.MULTI);
        const singleQuestion = questions.find((question) => question.type === QUESTION_TYPES.SINGLE);

        expect(context.gradeAnswerUseCase.execute(fillQuestion, buildCorrectAnswer(fillQuestion))).toBe(true);
        expect(context.gradeAnswerUseCase.execute(multiQuestion, buildCorrectAnswer(multiQuestion))).toBe(true);
        expect(context.gradeAnswerUseCase.execute(singleQuestion, buildCorrectAnswer(singleQuestion))).toBe(true);
    });

    test("grades Autonomy and alignment matrix questions from API", async () => {
        const examIds = [
            "mock-exam-drag-categorize-no",
            "mock-exam-drag-categorize-en"
        ];

        for (const examId of examIds) {
            const questions = await context.getExamQuestionsUseCase.execute(examId);
            const question = questions.find((candidate) => candidate.title === "Autonomy and alignment");

            expect(question).toMatchObject({
                type: QUESTION_TYPES.MATRIX_PLACEMENT,
                points: 4
            });
            expect(question.moduleId).toEqual(expect.any(String));
            expect(question.groupId).toEqual(expect.any(String));
            expect(question.items).toHaveLength(4);

            const answer = buildCorrectAnswer(question);

            expect(context.gradeAnswerUseCase.execute(question, answer)).toBe(true);
            expect(context.gradeAnswerUseCase.getQuestionScore(question, answer)).toBe(4);
        }
    });

    test("finds translated exam by base id and lang", async () => {
        const exam = await context.getExamByBaseIdAndLangUseCase.execute({
            baseId: "mock-exam-1",
            lang: "en"
        });

        expect(exam).toMatchObject({
            id: "mock-exam-1-en",
            baseId: "mock-exam-1",
            lang: "en"
        });
    });

    test("finds subject by id with exam count", async () => {
        const subject = await context.getSubjectByIdUseCase.execute({
            subjectId: "in5431",
            language: "en"
        });

        expect(subject).toMatchObject({
            id: "in5431",
            code: "IN5431",
            examCount: 11
        });
    });
});