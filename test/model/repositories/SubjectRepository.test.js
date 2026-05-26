//test/model/repositories/SubjectRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import SubjectRepository from "../../../src/model/repositories/SubjectRepository.js";

describe("SubjectRepository", () => {
    let subjectDataSource;
    let examRepository;
    let repository;

    const subjects = [
        {
            id: "in5431",
            code: "IN5431",
            name: "IT and Management",
            appName: "Exam Emulator",
            description: "Description",
            faculty: "Informatikk",
            icon: "clipboard",
            recommended: true
        },
        {
            id: "in2000",
            code: "IN2000",
            name: "Software Engineering",
            faculty: "Informatikk",
            icon: "code",
            isVisible: false
        }
    ];

    beforeEach(() => {
        subjectDataSource = {
            fetchSubjects: jest.fn().mockResolvedValue(subjects)
        };

        examRepository = {
            getAllExams: jest.fn().mockResolvedValue([
                { id: "exam-1-no", baseId: "exam-1", subjectId: "in5431", lang: "no" },
                { id: "exam-1-en", baseId: "exam-1", subjectId: "in5431", lang: "en" },
                { id: "exam-2-no", baseId: "exam-2", subjectId: "in5431", lang: "no" },
                { id: "exam-3-no", subjectId: "in2000", lang: "no" },
                { id: "ignored", lang: "no" }
            ])
        };

        repository = new SubjectRepository(subjectDataSource, examRepository);
    });

    test("maps subjects and applies defaults", async () => {
        const result = await repository.getSubjects();

        expect(result[0]).toMatchObject({
            id: "in5431",
            recommended: true,
            isVisible: true
        });
        expect(result[1]).toMatchObject({
            id: "in2000",
            recommended: false,
            isVisible: false
        });
    });

    test("finds subject by id", async () => {
        const result = await repository.getSubjectById("in5431");

        expect(result).toMatchObject({ id: "in5431" });
    });

    test("returns null when subject does not exist", async () => {
        const result = await repository.getSubjectById("missing");

        expect(result).toBeNull();
    });

    test("counts unique exams by baseId", async () => {
        const result = await repository.getSubjectsWithExamCount();

        expect(result.find((subject) => subject.id === "in5431").examCount).toBe(2);
        expect(result.find((subject) => subject.id === "in2000").examCount).toBe(1);
    });

    test("counts exams for selected language only", async () => {
        const result = await repository.getSubjectsWithExamCount({ language: "en" });

        expect(result.find((subject) => subject.id === "in5431").examCount).toBe(1);
        expect(result.find((subject) => subject.id === "in2000").examCount).toBe(0);
    });

    test("finds subject with exam count", async () => {
        const result = await repository.getSubjectByIdWithExamCount({
            subjectId: "in5431",
            language: "no"
        });

        expect(result).toMatchObject({
            id: "in5431",
            examCount: 2
        });
    });
});
