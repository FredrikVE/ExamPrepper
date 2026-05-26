//test/model/domain/CalculateExamScoreUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import CalculateExamScoreUseCase from "../../../src/model/domain/CalculateExamScoreUseCase.js";

describe("CalculateExamScoreUseCase", () => {
    let gradeAnswerUseCase;
    let useCase;

    beforeEach(() => {
        gradeAnswerUseCase = {
            execute: jest.fn()
        };

        useCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);
    });

    test("calculates score, total points and percentage", () => {
        const questions = [
            { id: "q1", points: 2 },
            { id: "q2", points: 3 },
            { id: "q3", points: 5 }
        ];

        const answers = {
            q1: "answer one",
            q2: "answer two",
            q3: "answer three"
        };

        gradeAnswerUseCase.execute
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        const result = useCase.execute(questions, answers);

        expect(result).toEqual({
            score: 7,
            totalPoints: 10,
            percentage: 70
        });
    });

    test("passes each question and its matching answer to GradeAnswerUseCase", () => {
        const questions = [
            { id: "q1", points: 1 },
            { id: "q2", points: 1 }
        ];
        const answers = { q1: 0, q2: [1, 2] };

        gradeAnswerUseCase.execute.mockReturnValue(true);

        useCase.execute(questions, answers);

        expect(gradeAnswerUseCase.execute).toHaveBeenCalledWith(questions[0], 0);
        expect(gradeAnswerUseCase.execute).toHaveBeenCalledWith(questions[1], [1, 2]);
    });

    test("returns zero percentage when there are no questions", () => {
        const result = useCase.execute([], {});

        expect(result).toEqual({
            score: 0,
            totalPoints: 0,
            percentage: 0
        });
    });
});
