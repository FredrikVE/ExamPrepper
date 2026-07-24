import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../../../src/navigation/navigation.js";

const useEffect = jest.fn((effect) => effect());
const previousLanguageRef = { current: "no" };
const useRef = jest.fn(() => previousLanguageRef);
const resolveTranslatedExamId = jest.fn();

jest.unstable_mockModule("react", () => ({
	useEffect,
	useRef
}));

jest.unstable_mockModule("../../../../src/ui/viewmodel/Utils/resolveTranslatedExamId.js", () => ({
	default: resolveTranslatedExamId
}));

const { default: useSyncSelectedExamWithLanguage } = await import("../../../../src/ui/viewmodel/AppNavigation/useSyncSelectedExamWithLanguage.js");

async function flushPromises() {
	await Promise.resolve();
	await Promise.resolve();
}

function createParams() {
	return {
		language: "en",
		activeScreen: NAV_SCREENS.EXAM,
		selectedExamId: "exam-no",
		selectedSubjectId: "subject-no",
		getExamByIdUseCase: {},
		getExamByBaseIdAndLangUseCase: {},
		onExamResolved: jest.fn(),
		onExamUnavailable: jest.fn(),
		onExamSyncFailed: jest.fn()
	};
}

describe("useSyncSelectedExamWithLanguage", () => {
	beforeEach(() => {
		previousLanguageRef.current = "no";
		jest.clearAllMocks();
	});

	test("routes an explicit null result to unavailable product state", async () => {
		resolveTranslatedExamId.mockResolvedValue(null);
		const params = createParams();
		useSyncSelectedExamWithLanguage(params);
		await flushPromises();
		expect(params.onExamUnavailable).toHaveBeenCalledTimes(1);
		expect(params.onExamSyncFailed).not.toHaveBeenCalled();
		expect(params.onExamResolved).not.toHaveBeenCalled();
	});

	test("routes an exception to technical sync-failure product state", async () => {
		resolveTranslatedExamId.mockRejectedValue(new Error("backend details"));
		const params = createParams();
		useSyncSelectedExamWithLanguage(params);
		await flushPromises();
		expect(params.onExamSyncFailed).toHaveBeenCalledTimes(1);
		expect(params.onExamUnavailable).not.toHaveBeenCalled();
		expect(params.onExamResolved).not.toHaveBeenCalled();
	});

	test("resolves the translated exam without triggering either error path", async () => {
		resolveTranslatedExamId.mockResolvedValue({ examId: "exam-en", subjectId: "subject-en" });
		const params = createParams();
		useSyncSelectedExamWithLanguage(params);
		await flushPromises();
		expect(params.onExamResolved).toHaveBeenCalledWith("exam-en", "subject-en");
		expect(params.onExamUnavailable).not.toHaveBeenCalled();
		expect(params.onExamSyncFailed).not.toHaveBeenCalled();
	});
});
