//test/integration/examFlow.integration.test.js
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
            examCount: 5,
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

        expect(exams).toHaveLength(5);
        expect(exams.map((exam) => exam.id)).toEqual([
            "mock-exam-1-no",
            "mock-exam-2-no",
            "mock-exam-3-no",
            "mock-exam-4-no",
            "mock-exam-drag-categorize-no",
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
            examCount: 5
        });
    });
});
