// test/integration/examFlow.integration.test.js
import { describe, expect, test } from "@jest/globals";
import { calculateExamScoreUseCase, getAvailableExamsUseCase, getAvailableSubjectsUseCase, getExamByBaseIdAndLangUseCase, getExamQuestionsUseCase, getSubjectByIdUseCase, gradeAnswerUseCase } from "../../src/di/dependencies.js";
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";

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

describe("exam flow integration", () => {
    test("loads visible subjects with exam counts from real data", async () => {
        const result = await getAvailableSubjectsUseCase.execute({ language: "no" });

        const in5431 = result.subjects.find((subject) => subject.id === "in5431");
        const in2000 = result.subjects.find((subject) => subject.id === "in2000");

        expect(result.subjects.length).toBeGreaterThan(0);
        expect(in5431).toMatchObject({
            code: "IN5431",
            examCount: 10,
            isVisible: true
        });
        expect(in2000).toMatchObject({
            code: "IN2000",
            examCount: 0,
            isVisible: true
        });
    });

    test("loads available Norwegian exams for IN5431 from real data", async () => {
        const exams = await getAvailableExamsUseCase.execute({
            subjectId: "in5431",
            language: "no"
        });

        expect(exams).toHaveLength(10);
        expect(exams.map((exam) => exam.id)).toEqual([
            "mock-exam-1-no",
            "mock-exam-2-no",
            "mock-exam-3-no",
            "mock-exam-4-no",
            "mock-exam-5-no",
            "mock-exam-definitions-no",
            "mock-exam-drag-categorize-no",
            "mock-exam-sustainability-no",
            "mock-exam-digital-strategy-no",
            "mock-exam-digital-transformation-no",
        ]);
        expect(exams.every((exam) => exam.questionCount > 0)).toBe(true);
    });

    test("loads available English exams for IN5431 from real data", async () => {
        const exams = await getAvailableExamsUseCase.execute({
            subjectId: "in5431",
            language: "en"
        });

        expect(exams).toHaveLength(10);
        expect(exams.map((exam) => exam.id)).toEqual([
            "mock-exam-1-en",
            "mock-exam-2-en",
            "mock-exam-3-en",
            "mock-exam-4-en",
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
        const questions = await getExamQuestionsUseCase.execute("mock-exam-1-no");
        const answers = Object.fromEntries(
            questions.map((question) => [question.id, buildCorrectAnswer(question)])
        );

        const result = calculateExamScoreUseCase.execute(questions, answers);

        expect(questions).toHaveLength(25);
        expect(result).toEqual({
            score: 25,
            totalPoints: 25,
            percentage: 100
        });
    });

    test("grades actual question examples from data", async () => {
        const questions = await getExamQuestionsUseCase.execute("mock-exam-1-en");
        const fillQuestion = questions.find((question) => question.type === QUESTION_TYPES.FILL);
        const multiQuestion = questions.find((question) => question.type === QUESTION_TYPES.MULTI);
        const singleQuestion = questions.find((question) => question.type === QUESTION_TYPES.SINGLE);

        expect(gradeAnswerUseCase.execute(fillQuestion, buildCorrectAnswer(fillQuestion))).toBe(true);
        expect(gradeAnswerUseCase.execute(multiQuestion, buildCorrectAnswer(multiQuestion))).toBe(true);
        expect(gradeAnswerUseCase.execute(singleQuestion, buildCorrectAnswer(singleQuestion))).toBe(true);
    });

    test("grades Autonomy and alignment matrix questions from real data", async () => {
        const examIds = [
            "mock-exam-drag-categorize-no",
            "mock-exam-drag-categorize-en"
        ];

        for (const examId of examIds) {
            const questions = await getExamQuestionsUseCase.execute(examId);
            const question = questions.find((candidate) => candidate.title === "Autonomy and alignment");

            expect(question).toMatchObject({
                type: QUESTION_TYPES.MATRIX_PLACEMENT,
                moduleId: "d4d",
                groupId: "accountability-framework",
                points: 4
            });
            expect(question.items).toHaveLength(4);

            const answer = buildCorrectAnswer(question);

            expect(gradeAnswerUseCase.execute(question, answer)).toBe(true);
            expect(gradeAnswerUseCase.getQuestionScore(question, answer)).toBe(4);
        }
    });

    test("finds translated exam by base id and lang", async () => {
        const exam = await getExamByBaseIdAndLangUseCase.execute({
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
        const subject = await getSubjectByIdUseCase.execute({
            subjectId: "in5431",
            language: "en"
        });

        expect(subject).toMatchObject({
            id: "in5431",
            code: "IN5431",
            examCount: 10
        });
    });
});
