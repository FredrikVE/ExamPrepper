import { describe, expect, test } from "@jest/globals";
import shuffleInPlace from "../../../../src/ui/viewmodel/Utils/shuffleInPlace.js";

describe("shuffleInPlace", () => {
	test("mutates and returns the same array with explicit RNG", () => {
		const items = ["a", "b", "c"];
		const randomValues = [0, 0.5];
		const randomNumber = () => randomValues.shift();
		const result = shuffleInPlace(items, randomNumber);
		expect(result).toBe(items);
		expect(result).toEqual(["c", "b", "a"]);
	});

	test("keeps zero- and one-item arrays unchanged", () => {
		const randomNumber = () => {
			throw new Error("RNG must not be called");
		};
		expect(shuffleInPlace([], randomNumber)).toEqual([]);
		expect(shuffleInPlace(["a"], randomNumber)).toEqual(["a"]);
	});
});
