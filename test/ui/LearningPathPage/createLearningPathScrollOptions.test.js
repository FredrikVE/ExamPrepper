// test/ui/LearningPathPage/createLearningPathScrollOptions.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathScrollOptions from "../../../src/ui/view/components/LearningPathPage/createLearningPathScrollOptions.js";

describe("createLearningPathScrollOptions", () => {
	test("uses nearest alignment and the requested behavior", () => {
		const options = createLearningPathScrollOptions({
			behavior: "smooth",
			prefersReducedMotion: false
		});

		expect(options).toEqual({
			block: "nearest",
			inline: "nearest",
			behavior: "smooth"
		});
	});

	test("uses automatic scrolling when reduced motion is preferred", () => {
		const options = createLearningPathScrollOptions({
			behavior: "smooth",
			prefersReducedMotion: true
		});

		expect(options).toEqual({
			block: "nearest",
			inline: "nearest",
			behavior: "auto"
		});
	});
});
