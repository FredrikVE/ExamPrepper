// test/ui/viewmodel/LearningContentSelectPage/examFilters.test.js
import { describe, expect, test } from "@jest/globals";
import { TEST_TYPES } from "../../../../src/navigation/navigation.js";
import {
	ALL_TOPIC_AREAS,
	filterExams,
	filterExamsByTestType
} from "../../../../src/ui/viewmodel/LearningContentSelectPage/examFilters.js";

const exams = [
	{
		id: "chapter-security",
		title: "Kapitteltest sikkerhet",
		description: "Grunnleggende sikkerhet",
		testType: TEST_TYPES.CHAPTER_TEST,
		topicAreaKeys: ["security"]
	},
	{
		id: "exam-security",
		title: "Eksamen sikkerhet",
		description: "Full eksamen",
		testType: TEST_TYPES.EXAM,
		topicAreaKeys: ["security"]
	},
	{
		id: "exam-governance",
		title: "Eksamen governance",
		description: "Full eksamen",
		testType: TEST_TYPES.EXAM,
		topicAreaKeys: ["governance"]
	},
	{
		id: "legacy-test",
		title: "Test uten type",
		description: "Mangler testType",
		topicAreaKeys: ["security"]
	}
];

describe("filterExams", () => {

	test("selects the active test type before search and topic filtering", () => {
		expect(filterExamsByTestType(exams, TEST_TYPES.CHAPTER_TEST)
			.map((exam) => exam.id)).toEqual(["chapter-security"]);
	});
	test("shows all tests when selectedTestType is null", () => {
		expect(filterExams(exams, "", ALL_TOPIC_AREAS, null)).toHaveLength(4);
	});

	test("shows only chapter tests", () => {
		expect(filterExams(exams, "", ALL_TOPIC_AREAS, TEST_TYPES.CHAPTER_TEST)
			.map((exam) => exam.id)).toEqual(["chapter-security"]);
	});

	test("shows only exams", () => {
		expect(filterExams(exams, "", ALL_TOPIC_AREAS, TEST_TYPES.EXAM)
			.map((exam) => exam.id)).toEqual([
			"exam-security",
			"exam-governance"
		]);
	});

	test("does not match a missing testType when a type is selected", () => {
		expect(filterExams([exams[3]], "", ALL_TOPIC_AREAS, TEST_TYPES.EXAM)).toEqual([]);
	});

	test("combines test type with search and topic area", () => {
		expect(filterExams(exams, "sikkerhet", "security", TEST_TYPES.EXAM)
			.map((exam) => exam.id)).toEqual(["exam-security"]);
	});
});
