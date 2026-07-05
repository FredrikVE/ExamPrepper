// test/ui/viewmodel/ExamPage/useExamQuestionLoadModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/loadStatus/loadStatus.js";

const stateValues = [];
const stateSetters = [];
const refValues = [];
const effectCleanups = [];

const useState = jest.fn((initialValue) => {
	const defaultValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateValues.length > 0 ? stateValues.shift() : defaultValue;
	const setter = jest.fn();

	stateSetters.push(setter);

	return [value, setter];
});

const useRef = jest.fn((initialValue) => {
	return refValues.length > 0
		? refValues.shift()
		: { current: initialValue };
});

const useEffect = jest.fn((effect) => {
	const cleanup = effect();
	effectCleanups.push(cleanup);
	return cleanup;
});

const useCallback = jest.fn((callback) => callback);

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

const { default: useExamQuestionLoadModel } = await import("../../../../src/ui/viewmodel/ExamPage/useExamQuestionLoadModel.js");

const flushPromises = async () => {
	await Promise.resolve();
	await Promise.resolve();
};

describe("useExamQuestionLoadModel", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		refValues.length = 0;
		effectCleanups.length = 0;
		useState.mockClear();
		useRef.mockClear();
		useEffect.mockClear();
		useCallback.mockClear();
	});

	test("returns initial loading state", () => {
		const viewModel = useExamQuestionLoadModel({
			getExamQuestionsUseCase: {
				execute: jest.fn(() => new Promise(() => {}))
			},
			examId: "exam-1",
			questionsLoadErrorMessage: "Kunne ikke laste spørsmål.",
			onQuestionsLoaded: jest.fn()
		});

		expect(viewModel.questions).toEqual([]);
		expect(viewModel.questionsStatus).toBe(LOAD_STATUS.LOADING);
		expect(viewModel.questionsError).toBe(null);
	});

	test("loads questions by examId and reports a fresh question set", async () => {
		const loadedQuestions = [{ id: "q1" }, { id: "q2" }];
		const execute = jest.fn(async () => loadedQuestions);
		const onQuestionsLoaded = jest.fn();

		useExamQuestionLoadModel({
			getExamQuestionsUseCase: { execute },
			examId: "exam-1",
			questionsLoadErrorMessage: "Kunne ikke laste spørsmål.",
			onQuestionsLoaded
		});

		await flushPromises();

		expect(execute).toHaveBeenCalledWith({ examId: "exam-1" });
		expect(stateSetters[0]).toHaveBeenNthCalledWith(1, expect.any(Function));
		expect(stateSetters[0]).toHaveBeenNthCalledWith(2, {
			status: LOAD_STATUS.READY,
			data: loadedQuestions,
			error: null
		});
		expect(onQuestionsLoaded).toHaveBeenCalledWith({
			loadedQuestions,
			shouldPreserveAttempt: false
		});
	});

	test("reports preserved attempt when question ids are unchanged", async () => {
		const loadedQuestions = [{ id: "q1" }, { id: "q2" }];
		const execute = jest.fn(async () => loadedQuestions);
		const onQuestionsLoaded = jest.fn();
		const questionsRef = { current: [{ id: "q1" }, { id: "q2" }] };
		refValues.push(questionsRef);

		useExamQuestionLoadModel({
			getExamQuestionsUseCase: { execute },
			examId: "exam-1-en",
			questionsLoadErrorMessage: "Kunne ikke laste spørsmål.",
			onQuestionsLoaded
		});

		await flushPromises();

		expect(questionsRef.current).toBe(loadedQuestions);
		expect(onQuestionsLoaded).toHaveBeenCalledWith({
			loadedQuestions,
			shouldPreserveAttempt: true
		});
	});

	test("sets fallback error message when question loading fails", async () => {
		const execute = jest.fn(async () => {
			throw null;
		});

		useExamQuestionLoadModel({
			getExamQuestionsUseCase: { execute },
			examId: "exam-1",
			questionsLoadErrorMessage: "Kunne ikke laste spørsmål.",
			onQuestionsLoaded: jest.fn()
		});

		await flushPromises();

		const updateFailedResource = stateSetters[0].mock.calls[1][0];
		const failedResource = updateFailedResource({
			status: LOAD_STATUS.LOADING,
			data: [],
			error: null
		});

		expect(failedResource).toEqual({
			status: LOAD_STATUS.ERROR,
			data: [],
			error: "Kunne ikke laste spørsmål."
		});
	});

	test("ignores completed loads after cleanup", async () => {
		let resolveQuestions;
		const execute = jest.fn(() => new Promise((resolve) => {
			resolveQuestions = resolve;
		}));
		const onQuestionsLoaded = jest.fn();

		useExamQuestionLoadModel({
			getExamQuestionsUseCase: { execute },
			examId: "exam-1",
			questionsLoadErrorMessage: "Kunne ikke laste spørsmål.",
			onQuestionsLoaded
		});

		effectCleanups[0]();
		resolveQuestions([{ id: "q1" }]);
		await flushPromises();

		expect(stateSetters[0]).toHaveBeenCalledTimes(1);
		expect(onQuestionsLoaded).not.toHaveBeenCalled();
	});
});
