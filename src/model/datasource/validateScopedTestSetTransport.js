// src/model/datasource/validateScopedTestSetTransport.js
import { LANGUAGES } from "../../i18n/translations.js";
import { TEST_TYPES } from "../../navigation/navigation.js";

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

export function validateExamTestSetList(response) {
	return validateTestSetList(response, TEST_TYPES.EXAM, "Exam");
}

export function validateExamTestSet(response) {
	return validateTestSet(response, TEST_TYPES.EXAM, "Exam");
}

export function validateChapterTestList(response) {
	return validateTestSetList(response, TEST_TYPES.CHAPTER_TEST, "ChapterTest");
}

export function validateChapterTest(response) {
	return validateTestSet(response, TEST_TYPES.CHAPTER_TEST, "ChapterTest");
}

function validateTestSetList(response, expectedTestType, resourceName) {
	if (!Array.isArray(response)) {
		throw invalidTransportResponse(resourceName);
	}

	for (const testSet of response) {
		if (!isScopedTestSetDto(testSet, expectedTestType)) {
			throw invalidTransportResponse(resourceName);
		}
	}

	return response;
}

function validateTestSet(response, expectedTestType, resourceName) {
	if (!isScopedTestSetDto(response, expectedTestType)) {
		throw invalidTransportResponse(resourceName);
	}

	return response;
}

function isScopedTestSetDto(testSet, expectedTestType) {
	return isPlainObject(testSet)
		&& hasExactTestSetFields(testSet)
		&& typeof testSet.id === "string"
		&& typeof testSet.baseId === "string"
		&& typeof testSet.subjectId === "string"
		&& Object.values(TEST_TYPES).includes(testSet.testType)
		&& testSet.testType === expectedTestType
		&& Object.values(LANGUAGES).includes(testSet.lang)
		&& typeof testSet.title === "string"
		&& isStringOrNull(testSet.description)
		&& isStringOrNull(testSet.modeLabel)
		&& isIntegerOrNull(testSet.estimatedMinutes)
		&& Number.isInteger(testSet.questionCount)
		&& Number.isInteger(testSet.sortOrder)
		&& Array.isArray(testSet.topicAreaKeys)
		&& testSet.topicAreaKeys.every((topicAreaKey) => typeof topicAreaKey === "string");
}

function hasExactTestSetFields(testSet) {
	if (Object.keys(testSet).length !== TEST_SET_FIELDS.length) {
		return false;
	}

	for (const field of TEST_SET_FIELDS) {
		if (!Object.hasOwn(testSet, field)) {
			return false;
		}
	}

	return true;
}

function isPlainObject(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringOrNull(value) {
	return value === null || typeof value === "string";
}

function isIntegerOrNull(value) {
	return value === null || Number.isInteger(value);
}

function invalidTransportResponse(resourceName) {
	return new Error(`Invalid ${resourceName} TestSet transport response`);
}
