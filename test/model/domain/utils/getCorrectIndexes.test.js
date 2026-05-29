// test/model/domain/utils/getCorrectIndexes.test.js
import { describe, expect, test } from "@jest/globals";
import getCorrectIndexes from "../../../../src/model/domain/utils/getCorrectIndexes.js";

describe("getCorrectIndexes", () => {
    test("returns indexes of correct options", () => {
        const question = {
            options: [
                { correct: true },
                { correct: false },
                { correct: true }
            ]
        };

        expect(getCorrectIndexes(question)).toEqual([0, 2]);
    });

    test("returns an empty list when options are missing", () => {
        expect(getCorrectIndexes({})).toEqual([]);
    });
});
