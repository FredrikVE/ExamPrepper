import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];

const useState = jest.fn((initialValue) => {
	const defaultValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateValues.length > 0 ? stateValues.shift() : defaultValue;
	const setter = jest.fn();

	stateSetters.push(setter);

	return [value, setter];
});

const useEffect = jest.fn((effect) => {
	return effect();
});

const useCallback = jest.fn((callback) => callback);

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useState
}));

const { default: useExamSubmitModel } = await import("../../../../src/ui/viewmodel/ExamPage/useExamSubmitModel.js");

const createModel = (overrides = {}) => {
	return useExamSubmitModel({
		attemptSaveErrorMessage: "Kunne ikke lagre forsøket.",
		isSubmitted: false,
		submitExamAttemptUseCase: {
			execute: jest.fn(async () => ({ id: "attempt-1" }))
		},
		onExamSubmitted: jest.fn(),
		onSubmitStarted: jest.fn(),
		...overrides
	});
};

const flushPromises = async () => {
	await Promise.resolve();
	await Promise.resolve();
};

describe("useExamSubmitModel", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();
		useEffect.mockClear();
		useCallback.mockClear();
	});

	test("returns default submit state", () => {
		const viewModel = createModel();

		expect(viewModel.savedAttempt).toBe(null);
		expect(viewModel.attemptSaving).toBe(false);
		expect(viewModel.attemptSaveError).toBe(null);
		expect(viewModel.isSubmitConfirmOpen).toBe(false);
	});

	test("submits transformed answers and stores the saved attempt", async () => {
		const savedAttempt = { id: "attempt-1" };
		const execute = jest.fn(async () => savedAttempt);
		const onExamSubmitted = jest.fn();
		const onSubmitStarted = jest.fn();
		const viewModel = createModel({
			submitExamAttemptUseCase: { execute },
			onExamSubmitted,
			onSubmitStarted
		});

		await viewModel.submitExamAttempt({
			answers: { q1: 0 },
			examId: "exam-1-no",
			language: "no",
			questions: [
				{
					id: "q1",
					type: "single",
					options: [{ id: "q1-a" }]
				}
			],
			durationSeconds: 42
		});

		expect(onExamSubmitted).toHaveBeenCalledTimes(1);
		expect(onSubmitStarted).toHaveBeenCalledTimes(1);
		expect(execute).toHaveBeenCalledWith({
			examId: "exam-1-no",
			lang: "no",
			durationSeconds: 42,
			answers: { q1: "q1-a" }
		});
		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[1]).toHaveBeenCalledWith(null);
		expect(stateSetters[0]).toHaveBeenCalledWith(savedAttempt);
		expect(stateSetters[2]).toHaveBeenLastCalledWith(false);
	});

	test("stores fallback error message when submit fails", async () => {
		const execute = jest.fn(async () => {
			throw null;
		});
		const viewModel = createModel({
			submitExamAttemptUseCase: { execute }
		});

		await viewModel.submitExamAttempt({
			answers: {},
			examId: "exam-1-no",
			language: "no",
			questions: [],
			durationSeconds: 42
		});

		expect(stateSetters[1]).toHaveBeenCalledWith("Kunne ikke lagre forsøket.");
		expect(stateSetters[2]).toHaveBeenLastCalledWith(false);
	});

	test("opens, closes, and resets submit confirmation state", () => {
		const viewModel = createModel();

		viewModel.openSubmitConfirmation();
		viewModel.closeSubmitConfirmation();
		viewModel.resetSubmitModel();

		expect(stateSetters[3]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[0]).toHaveBeenCalledWith(null);
		expect(stateSetters[1]).toHaveBeenCalledWith(null);
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenLastCalledWith(false);
	});

	test("confirmation closes before submitting", async () => {
		const execute = jest.fn(async () => ({ id: "attempt-1" }));
		const viewModel = createModel({
			submitExamAttemptUseCase: { execute }
		});

		await viewModel.confirmSubmitExamAttempt({
			answers: {},
			examId: "exam-1-no",
			language: "no",
			questions: [],
			durationSeconds: 42
		});
		await flushPromises();

		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(execute).toHaveBeenCalledWith({
			examId: "exam-1-no",
			lang: "no",
			durationSeconds: 42,
			answers: {}
		});
	});

	test("closes submit confirmation after the exam has been submitted", () => {
		createModel({ isSubmitted: true });

		expect(stateSetters[3]).toHaveBeenCalledWith(false);
	});
});
