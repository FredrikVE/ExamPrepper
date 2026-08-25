// test/model/domain/testSets/GetTestSetByIdUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetTestSetByIdUseCase from "../../../../src/model/domain/testSets/GetTestSetByIdUseCase.js";

describe("GetTestSetByIdUseCase", () => {
    const testSet = {
        id: "exam-no",
        baseId: "exam",
        subjectId: "in5431",
        lang: "no",
        title: "Norsk eksamen"
    };

    let testSetRepository;
    let useCase;

    beforeEach(() => {
        testSetRepository = {
            getTestSetById: jest.fn().mockResolvedValue(testSet)
        };

        useCase = new GetTestSetByIdUseCase(testSetRepository);
    });

    test("returns test set from repository when id is provided", async () => {
        const result = await useCase.execute("exam-no");

        expect(testSetRepository.getTestSetById).toHaveBeenCalledWith("exam-no");
        expect(result).toEqual(testSet);
    });

    test("returns null when testSetId is null", async () => {
        const result = await useCase.execute(null);

        expect(result).toBeNull();
    });

    test("returns null when testSetId is undefined", async () => {
        const result = await useCase.execute(undefined);

        expect(result).toBeNull();
    });

    test("returns null when testSetId is empty string", async () => {
        const result = await useCase.execute("");

        expect(result).toBeNull();
    });
});
