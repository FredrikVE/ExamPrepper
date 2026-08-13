// test/model/repositories/TestSetRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import TestSetRepository from "../../../src/model/repositories/TestSetRepository.js";

describe("TestSetRepository", () => {
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
            questionCount: 2,
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
            questionCount: 1,
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
            fetchTestSetsBySubject: jest.fn(({ subjectId, language }) => Promise.resolve(
                exams.filter((exam) => exam.subjectId === subjectId && (!language || exam.lang === language))
            )),
            fetchTestSetById: jest.fn((testSetId) => Promise.resolve(
                exams.find((exam) => exam.id === testSetId) ?? null
            ))
        };
        questionDataSource = {
            fetchPracticeQuestions: jest.fn((testSetId) => Promise.resolve(
                exams.find((exam) => exam.id === testSetId)?.questions ?? []
            ))
        };

        repository = new TestSetRepository(dataSource, questionDataSource);
    });

    test("loads only the requested subject and language scope", async () => {
        const result = await repository.getAvailableTestSets({
            subjectId: "in5431",
            language: "no"
        });

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            id: "exam-no",
            subjectId: "in5431",
            lang: "no",
            testType: "exam",
            questionCount: 2
        });
        expect(dataSource.fetchTestSetsBySubject).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "no"
        });
    });

    test("requires a subject scope instead of falling back to a global catalog", async () => {
        await expect(repository.getAvailableTestSets({ language: "no" })).resolves.toEqual([]);
        expect(dataSource.fetchTestSetsBySubject).not.toHaveBeenCalled();
    });

    test("caches list requests per subject and language", async () => {
        await repository.getAvailableTestSets({ subjectId: "in5431", language: "no" });
        await repository.getAvailableTestSets({ subjectId: "in5431", language: "no" });
        await repository.getAvailableTestSets({ subjectId: "in5431", language: "en" });

        expect(dataSource.fetchTestSetsBySubject).toHaveBeenCalledTimes(2);
    });

    test("retries scoped list requests after failures", async () => {
        dataSource.fetchTestSetsBySubject
            .mockRejectedValueOnce(new Error("network down"))
            .mockResolvedValueOnce([exams[0]]);

        await expect(repository.getAvailableTestSets({ subjectId: "in5431", language: "no" }))
            .rejects.toThrow("network down");
        await expect(repository.getAvailableTestSets({ subjectId: "in5431", language: "no" }))
            .resolves.toHaveLength(1);

        expect(dataSource.fetchTestSetsBySubject).toHaveBeenCalledTimes(2);
    });

    test("returns questions for a test set and caches detail/question reads by id", async () => {
        const firstResult = await repository.getTestSetQuestions("exam-no");
        const secondResult = await repository.getTestSetQuestions("exam-no");

        expect(firstResult).toEqual([{ id: 1 }, { id: 2 }]);
        expect(secondResult).toEqual([{ id: 1 }, { id: 2 }]);
        expect(dataSource.fetchTestSetById).toHaveBeenCalledTimes(1);
        expect(questionDataSource.fetchPracticeQuestions).toHaveBeenCalledTimes(1);
    });

    test("dedupes parallel detail requests and retries after failure", async () => {
        const deferredTestSet = createDeferred();
        dataSource.fetchTestSetById.mockReset();
        dataSource.fetchTestSetById.mockReturnValueOnce(deferredTestSet.promise);

        const firstRequest = repository.getTestSetById("exam-no");
        const secondRequest = repository.getTestSetById("exam-no");
        expect(dataSource.fetchTestSetById).toHaveBeenCalledTimes(1);

        deferredTestSet.resolve(exams[0]);
        await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual([exams[0], exams[0]]);

        dataSource.fetchTestSetById
            .mockRejectedValueOnce(new Error("detail failed"))
            .mockResolvedValueOnce(exams[1]);

        await expect(repository.getTestSetById("exam-en")).rejects.toThrow("detail failed");
        await expect(repository.getTestSetById("exam-en")).resolves.toBe(exams[1]);
    });

    test("finds translated test set through the scoped subject-language cache", async () => {
        const result = await repository.getTestSetByBaseIdAndLang({
            baseId: "exam",
            language: "en",
            subjectId: "in5431"
        });

        expect(result).toBe(exams[1]);
        expect(dataSource.fetchTestSetsBySubject).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "en"
        });
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
            fetchTestSetsBySubject: jest.fn().mockResolvedValue([examWithImage]),
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

        const localRepository = new TestSetRepository(localDataSource, localQuestionDataSource, conceptImageDataSource);

        const result = await localRepository.getTestSetQuestions("exam-with-image");

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
        const result = await repository.getTestSetQuestions("missing");

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

        const result = await repository.getTestSetQuestions("exam-no");

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

        await expect(repository.getTestSetQuestions("exam-no")).rejects.toThrow(
            "Invalid canonical practice question single-invalid: option a requires isCorrect"
        );
    });

    test("finds exam by base id and language through cached exam list", async () => {
        const result = await repository.getTestSetByBaseIdAndLang({ baseId: "exam", language: "en", subjectId: "in5431" });

        expect(result).toMatchObject({ id: "exam-en" });
        expect(dataSource.fetchTestSetsBySubject).toHaveBeenCalledTimes(1);
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
