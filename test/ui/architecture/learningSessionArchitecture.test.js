// test/ui/architecture/learningSessionArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const LEARNING_SESSION_HELPER_ROOT = path.resolve("src/ui/viewmodel/LearningSession");
const EXPECTED_HELPER_FILES = [
	"LearningSessionPagePresentation.js",
	"LearningSessionStates.js",
	"sessionReducer.js"
];

describe("LearningSession architecture", () => {
	test("keeps one interaction reducer, one state vocabulary and one presentation boundary", () => {
		const files = fs.readdirSync(LEARNING_SESSION_HELPER_ROOT)
			.filter((fileName) => fileName.endsWith(".js"))
			.sort();

		expect(files).toEqual(EXPECTED_HELPER_FILES);
	});
});
