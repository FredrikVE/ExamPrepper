//test/model/repositories/ExamRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import ExamRepository from "../../../src/model/repositories/ExamRepository.js";

describe("ExamRepository", () => {
    let dataSource;
    let repository;

    const exams = [
        {
            id: "exam-no",
            baseId: "exam",
            subjectId: "in5431",
            lang: "no",
            title: "Norsk eksamen",
            description: "Beskrivelse",
            duration: "2 timer",
            durationMinutes: 120,
            questions: [{ id: 1 }, { id: 2 }]
        },
        {
            id: "exam-en",
            baseId: "exam",
            subjectId: "in5431",
            lang: "en",
            title: "English exam",
            questions: [{ id: 3 }]
        },
        {
            id: "other-subject",
            baseId: "other",
            subjectId: "in2000",
            lang: "no",
            title: "Other exam",
            questionCount: 7,
            questions: []
        }
    ];

    beforeEach(() => {
        dataSource = {
            fetchAllExams: jest.fn().mockResolvedValue(exams),
            fetchExamById: jest.fn((examId) => Promise.resolve(
                exams.find((exam) => exam.id === examId) ?? null
            )),
            fetchExamByBaseIdAndLang: jest.fn((baseId, language) => Promise.resolve(
                exams.find((exam) => exam.baseId === baseId && exam.lang === language) ?? null
            ))
        };

        repository = new ExamRepository(dataSource);
    });

    test("filters available exams by subject and language", async () => {
        const result = await repository.getAvailableExams({
            subjectId: "in5431",
            language: "no"
        });

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            id: "exam-no",
            subjectId: "in5431",
            lang: "no",
            questionCount: 2
        });
    });

    test("uses explicit questionCount before questions length", async () => {
        const result = await repository.getAvailableExams({
            subjectId: "in2000",
            language: "no"
        });

        expect(result[0].questionCount).toBe(7);
    });

    test("returns all exams when filters are omitted", async () => {
        const result = await repository.getAvailableExams();

        expect(result).toHaveLength(3);
    });

    test("returns questions for exam", async () => {
        const result = await repository.getExamQuestions("exam-no");

        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test("returns empty questions when exam is not found", async () => {
        const result = await repository.getExamQuestions("missing");

        expect(result).toEqual([]);
    });

    test("finds exam by base id and language", async () => {
        const result = await repository.getExamByBaseIdAndLang("exam", "en");

        expect(result).toMatchObject({ id: "exam-en" });
        expect(dataSource.fetchExamByBaseIdAndLang).toHaveBeenCalledWith("exam", "en");
    });
});
