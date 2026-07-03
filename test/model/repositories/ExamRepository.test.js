// test/model/repositories/ExamRepository.test.js
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
            modeLabel: "FULL ØVEKSAMEN",
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
            modeLabel: "FULL ØVEKSAMEN",
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

        expect(dataSource.fetchAllExams).toHaveBeenCalledTimes(1);
    });

    test("retries all exams list requests after failures", async () => {
        dataSource.fetchAllExams
            .mockRejectedValueOnce(new Error("network down"))
            .mockResolvedValueOnce(exams);

        await expect(repository.getAllExams()).rejects.toThrow("network down");
        const result = await repository.getAllExams();

        expect(result).toBe(exams);
        expect(dataSource.fetchAllExams).toHaveBeenCalledTimes(2);
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
        expect(dataSource.fetchExamById).toHaveBeenCalledTimes(1);
        expect(dataSource.fetchExamById).toHaveBeenCalledWith("exam-no");
    });

    test("dedupes parallel exam requests by exam id", async () => {
        const deferredExam = createDeferred();
        dataSource.fetchExamById.mockReset();
        dataSource.fetchExamById.mockReturnValue(deferredExam.promise);

        const firstRequest = repository.getExamById("exam-no");
        const secondRequest = repository.getExamById("exam-no");

        expect(dataSource.fetchExamById).toHaveBeenCalledTimes(1);

        deferredExam.resolve(exams[0]);

        await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual([
            exams[0],
            exams[0]
        ]);
    });

    test("retries exam requests after failures", async () => {
        dataSource.fetchExamById
            .mockRejectedValueOnce(new Error("exam request failed"))
            .mockResolvedValueOnce(exams[0]);

        await expect(repository.getExamById("exam-no")).rejects.toThrow("exam request failed");
        const result = await repository.getExamById("exam-no");

        expect(result).toBe(exams[0]);
        expect(dataSource.fetchExamById).toHaveBeenCalledTimes(2);
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
            fetchAllExams: jest.fn().mockResolvedValue([examWithImage]),
            fetchExamById: jest.fn().mockResolvedValue(examWithImage),
            fetchExamByBaseIdAndLang: jest.fn()
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

        const localRepository = new ExamRepository(localDataSource, conceptImageDataSource);

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

    test("finds exam by base id and language through cached exam list", async () => {
        const result = await repository.getExamByBaseIdAndLang("exam", "en");

        expect(result).toMatchObject({ id: "exam-en" });
        expect(dataSource.fetchAllExams).toHaveBeenCalledTimes(1);
        expect(dataSource.fetchExamByBaseIdAndLang).not.toHaveBeenCalled();
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
