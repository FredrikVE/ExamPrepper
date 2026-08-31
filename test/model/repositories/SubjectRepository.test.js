// test/model/repositories/SubjectRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import SubjectRepository from "../../../src/model/repositories/SubjectRepository.js";

describe("SubjectRepository", () => {
    let subjectDataSource;
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
            recommended: true,
            practiceTestCount: 16
        },
        {
            id: "in2000",
            code: "IN2000",
            name: "Software Engineering",
            faculty: "Informatikk",
            iconKey: "shield",
            isVisible: false,
            practiceTestCount: 3
        }
    ];

    beforeEach(() => {
        subjectDataSource = {
            fetchSubjects: jest.fn().mockResolvedValue(subjects),
            fetchSubjectById: jest.fn(({ subjectId }) => Promise.resolve(
                subjects.find((subject) => subject.id === subjectId) ?? null
            )),
            fetchTopicAreasBySubject: jest.fn().mockResolvedValue([])
        };

        repository = new SubjectRepository(subjectDataSource);
    });

    test("maps backend-owned practiceTestCount and applies subject defaults", async () => {
        const result = await repository.getSubjectsWithPracticeTestCount({ language: "no" });

        expect(subjectDataSource.fetchSubjects).toHaveBeenCalledWith({ language: "no" });
        expect(result[0]).toMatchObject({
            id: "in5431",
            recommended: true,
            isVisible: true,
            practiceTestCount: 16
        });
        expect(result[1]).toMatchObject({
            id: "in2000",
            icon: "shield",
            recommended: false,
            isVisible: false,
            practiceTestCount: 3
        });
    });

    test("uses the direct subject detail read instead of listing all subjects", async () => {
        const result = await repository.getSubjectByIdWithPracticeTestCount({
            subjectId: "in5431",
            language: "en"
        });

        expect(result).toMatchObject({
            id: "in5431",
            practiceTestCount: 16
        });
        expect(subjectDataSource.fetchSubjectById).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "en"
        });
        expect(subjectDataSource.fetchSubjects).not.toHaveBeenCalled();
    });

    test("returns null when the direct detail read returns null", async () => {
        const result = await repository.getSubjectByIdWithPracticeTestCount({
            subjectId: "missing",
            language: "no"
        });

        expect(result).toBeNull();
    });
});
