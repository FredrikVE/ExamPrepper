// test/ui/GlossaryPage/directNeighborLevelModel.test.js
import { describe, expect, test } from "@jest/globals";
import { DIRECT_NEIGHBOR_LEVELS, DIRECT_NEIGHBOR_MAX_LEVEL, createDirectNeighborLevelPresentation, resolveDirectNeighborLevel } from "../../../src/ui/viewmodel/GlossaryPage/directNeighborLevelModel.js";

describe("directNeighborLevelModel", () => {
	test.each([
		[0, 0],
		[1, 1],
		[2, 2],
		[3, 2],
		[4, 3],
		[5, 3],
		[6, 4],
		[20, 4]
	])("maps %i direct neighbors to level %i", (directNeighborCount, expectedLevel) => {
		expect(resolveDirectNeighborLevel(directNeighborCount)).toBe(expectedLevel);
	});

	test("derives the maximum level from the registered meter levels", () => {
		expect(DIRECT_NEIGHBOR_MAX_LEVEL).toBe(DIRECT_NEIGHBOR_LEVELS.length);
		expect(DIRECT_NEIGHBOR_LEVELS).toEqual([1, 2, 3, 4]);
	});

	test("builds the meter presentation from count, level and accessibility label", () => {
		expect(createDirectNeighborLevelPresentation({ directNeighborCount: 4, ariaLabel: "4 assosierte begreper" })).toEqual({
			value: 4,
			level: 3,
			ariaLabel: "4 assosierte begreper"
		});
	});
});
