// test/model/repositories/ExamRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import ExamRepository from "../../../src/model/repositories/ExamRepository.js";

describe("ExamRepository", () => {
    let dataSource;
    let questionDataSource;
    let repository;

    const exams = [
        {
            id: "exam-no",
            baseId: "exam",
            subjectId: "in5431",
            lang: "no",
            title: "Norsk eksamen",
            description: "Beskrivelse",
            modeLabel: "FULL ØVEKSAMEN",
            testType: "exam",
            estimatedMinutes: "45–60",
            duration: "2 timer",
            durationMinutes: 120,
            sortOrder: 20,
            questions: [{ id: 1 }, { id: 2 }]
        },
        {
            id: "exam-en",
            baseId: "exam",
            subjectId: "in5431",
            lang: "en",
            title: "English exam",
            testType: "exam",
            sortOrder: 10,
            questions: [{ id: 3 }]
        },
        {
            id: "other-subject",
            baseId: "other",
            subjectId: "in2000",
            lang: "no",
            title: "Other exam",
            sortOrder: 30,
            questionCount: 7,
            questions: []
        }
    ];

    beforeEach(() => {
        dataSource = {
            fetchAllTestSets: jest.fn().mockResolvedValue(exams),
            fetchTestSetById: jest.fn((examId) => Promise.resolve(
                exams.find((exam) => exam.id === examId) ?? null
            ))
        };
        questionDataSource = {
            fetchPracticeQuestions: jest.fn((examId) => Promise.resolve(
                exams.find((exam) => exam.id === examId)?.questions ?? []
            ))
        };

        repository = new ExamRepository(dataSource, questionDataSource);
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
            modeLabel: "FULL ØVEKSAMEN",
            testType: "exam",
            estimatedMinutes: "45–60",
            sortOrder: 20,
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

    test("uses null when testType is missing", async () => {
        const result = await repository.getAvailableExams({
            subjectId: "in2000",
            language: "no"
        });

        expect(result[0].testType).toBeNull();
    });

    test("returns all exams when filters are omitted", async () => {
        const result = await repository.getAvailableExams();

        expect(result).toHaveLength(3);
    });

    test("caches all exams list requests", async () => {
        await repository.getAvailableExams();
        await repository.getAvailableExams({
            subjectId: "in5431",
            language: "en"
        });

        expect(dataSource.fetchAllTestSets).toHaveBeenCalledTimes(1);
    });

    test("retries all exams list requests after failures", async () => {
        dataSource.fetchAllTestSets
            .mockRejectedValueOnce(new Error("network down"))
            .mockResolvedValueOnce(exams);

        await expect(repository.getAllExams()).rejects.toThrow("network down");
        const result = await repository.getAllExams();

        expect(result).toBe(exams);
        expect(dataSource.fetchAllTestSets).toHaveBeenCalledTimes(2);
    });

    test("sorts available exams by explicit sortOrder", async () => {
        const result = await repository.getAvailableExams();

        expect(result.map((exam) => exam.id)).toEqual([
            "exam-en",
            "exam-no",
            "other-subject"
        ]);
    });

    test("returns questions for exam", async () => {
        const result = await repository.getExamQuestions("exam-no");

        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test("caches exam requests by exam id", async () => {
        const firstResult = await repository.getExamQuestions("exam-no");
        const secondResult = await repository.getExamQuestions("exam-no");

        expect(firstResult).toEqual([{ id: 1 }, { id: 2 }]);
        expect(secondResult).toEqual([{ id: 1 }, { id: 2 }]);
        expect(dataSource.fetchTestSetById).toHaveBeenCalledTimes(1);
        expect(dataSource.fetchTestSetById).toHaveBeenCalledWith("exam-no");
    });

    test("dedupes parallel exam requests by exam id", async () => {
        const deferredExam = createDeferred();
        dataSource.fetchTestSetById.mockReset();
        dataSource.fetchTestSetById.mockReturnValue(deferredExam.promise);

        const firstRequest = repository.getExamById("exam-no");
        const secondRequest = repository.getExamById("exam-no");

        expect(dataSource.fetchTestSetById).toHaveBeenCalledTimes(1);

        deferredExam.resolve(exams[0]);

        await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual([
            exams[0],
            exams[0]
        ]);
    });

    test("retries exam requests after failures", async () => {
        dataSource.fetchTestSetById
            .mockRejectedValueOnce(new Error("exam request failed"))
            .mockResolvedValueOnce(exams[0]);

        await expect(repository.getExamById("exam-no")).rejects.toThrow("exam request failed");
        const result = await repository.getExamById("exam-no");

        expect(result).toBe(exams[0]);
        expect(dataSource.fetchTestSetById).toHaveBeenCalledTimes(2);
    });

    test("hydrates answer options with subject-scoped concept images", async () => {
        const examWithImage = {
            id: "exam-with-image",
            baseId: "exam-with-image",
            subjectId: "in5431",
            lang: "no",
            title: "Exam with image",
            questions: [
                {
                    id: 1,
                    moduleId: "designed-for-digital",
                    groupId: "d4d-building-blocks",
                    options: [
                        {
                            text: "Operational Backbone",
                            whyExtendedImageRefs: [
                                "operational-backbone"
                            ]
                        }
                    ]
                }
            ]
        };

        const localDataSource = {
            fetchAllTestSets: jest.fn().mockResolvedValue([examWithImage]),
            fetchTestSetById: jest.fn().mockResolvedValue(examWithImage)
        };
        const localQuestionDataSource = {
            fetchPracticeQuestions: jest.fn().mockResolvedValue(examWithImage.questions)
        };

        const conceptImageDataSource = {
            getConceptImages: jest.fn().mockReturnValue([
                {
                    id: "operational-backbone",
                    src: "/subjects/in5431/designed-for-digital/d4d-building-blocks/operational-backbone.svg",
                    alt: "Operational Backbone i praksis",
                    title: "Operational Backbone",
                    caption: "Caption"
                }
            ])
        };

        const localRepository = new ExamRepository(localDataSource, localQuestionDataSource, conceptImageDataSource);

        const result = await localRepository.getExamQuestions("exam-with-image");

        expect(conceptImageDataSource.getConceptImages).toHaveBeenCalledWith(
            ["operational-backbone"],
            {
                subjectId: "in5431",
                moduleId: "designed-for-digital",
                groupId: "d4d-building-blocks",
                language: "no"
            }
        );
        expect(result[0].options[0].whyExtendedImages).toEqual([
            expect.objectContaining({
                id: "operational-backbone",
                src: "/subjects/in5431/designed-for-digital/d4d-building-blocks/operational-backbone.svg",
                alt: "Operational Backbone i praksis"
            })
        ]);
        expect(examWithImage.questions[0].options[0].whyExtendedImages).toBeUndefined();
    });

    test("returns empty questions when exam is not found", async () => {
        const result = await repository.getExamQuestions("missing");

        expect(result).toEqual([]);
    });

    test("maps the canonical practice response without legacy correctness fallbacks", async () => {
        questionDataSource.fetchPracticeQuestions.mockResolvedValueOnce([
            {
                id: "single-1",
                type: "single",
                options: [
                    { id: "a", isCorrect: true, feedback: "Riktig" },
                    { id: "b", isCorrect: false }
                ]
            },
            {
                id: "fill-1",
                type: "fill",
                acceptedAnswers: ["COBIT"]
            }
        ]);

        const result = await repository.getExamQuestions("exam-no");

        expect(result[0].options[0]).toMatchObject({
            isCorrect: true,
            correct: true,
            feedback: "Riktig",
            why: "Riktig"
        });
        expect(result[0].options[1]).toMatchObject({
            isCorrect: false,
            correct: false
        });
        expect(result[0].options[1]).not.toHaveProperty("why");
        expect(result[1]).toMatchObject({
            acceptedAnswers: ["COBIT"],
            answers: ["COBIT"]
        });
    });

    test("rejects missing canonical correctness instead of treating it as false", async () => {
        questionDataSource.fetchPracticeQuestions.mockResolvedValueOnce([
            {
                id: "single-invalid",
                type: "single",
                options: [{ id: "a", feedback: "Manglende correctness" }]
            }
        ]);

        await expect(repository.getExamQuestions("exam-no")).rejects.toThrow(
            "Invalid canonical practice question single-invalid: option a requires isCorrect"
        );
    });

    test("finds exam by base id and language through cached exam list", async () => {
        const result = await repository.getExamByBaseIdAndLang("exam", "en");

        expect(result).toMatchObject({ id: "exam-en" });
        expect(dataSource.fetchAllTestSets).toHaveBeenCalledTimes(1);
        expect(dataSource.fetchTestSetById).not.toHaveBeenCalledWith("exam-en");
    });
});

function createDeferred() {
    let resolve;
    let reject;

    const promise = new Promise((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });

    return {
        promise,
        resolve,
        reject
    };
}
