// test/contracts/scopedTestSetTransportContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES } from "../../src/i18n/translations.js";
import { TEST_TYPES } from "../../src/navigation/navigation.js";

const FIXTURE_PATH = path.resolve(
	"test/fixtures/scoped-test-set/scoped-test-set-dtos.json"
);

const TEST_SET_FIELDS = [
	"id",
	"baseId",
	"subjectId",
	"testType",
	"lang",
	"title",
	"description",
	"modeLabel",
	"estimatedMinutes",
	"questionCount",
	"sortOrder",
	"topicAreaKeys"
];

const NULLABLE_FIELDS = [
	"description",
	"modeLabel",
	"estimatedMinutes"
];

function readFixture() {
	return JSON.parse(fs.readFileSync(FIXTURE_PATH, "utf8"));
}

function expectSharedTestSetShape(testSet) {
	expect(Object.keys(testSet).sort())
		.toEqual([...TEST_SET_FIELDS].sort());

	for (const field of TEST_SET_FIELDS) {
		expect(Object.hasOwn(testSet, field)).toBe(true);

		if (!NULLABLE_FIELDS.includes(field)) {
			expect(testSet[field]).not.toBeNull();
		}
	}
}

describe("scoped TestSet transport contract", () => {
	test("uses one shared DTO shape for both scoped resource types", () => {
		const testSets = readFixture();

		expect(testSets).toHaveLength(2);

		for (const testSet of testSets) {
			expectSharedTestSetShape(testSet);
		}

		expect(testSets.map((testSet) => testSet.testType).sort())
			.toEqual(Object.values(TEST_TYPES).sort());

		expect(testSets.map((testSet) => testSet.lang).sort())
			.toEqual(Object.values(LANGUAGES).sort());
	});

	test("locks the only nullable TestSet transport fields", () => {
		const testSets = readFixture();
		const nullableFixture = testSets.find(
			(testSet) => testSet.testType === TEST_TYPES.EXAM
		);

		for (const field of NULLABLE_FIELDS) {
			expect(nullableFixture[field]).toBeNull();
		}
	});
});