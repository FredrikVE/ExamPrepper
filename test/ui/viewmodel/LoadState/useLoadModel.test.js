// test/ui/viewmodel/LoadState/useLoadModel.test.js
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

const { default: useLoadModel } = await import("../../../../src/ui/viewmodel/LoadState/useLoadModel.js");

const flushPromises = async () => {
	await Promise.resolve();
	await Promise.resolve();
};

describe("useLoadModel", () => {
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

	test("returns initial loading resource", () => {
		const emptyData = [];
		const loadModel = useLoadModel({
			execute: jest.fn(() => new Promise(() => {})),
			emptyData,
			errorFallbackMessage: "Kunne ikke laste.",
			onLoaded: jest.fn()
		});

		expect(loadModel.status).toBe(LOAD_STATUS.LOADING);
		expect(loadModel.data).toBe(emptyData);
		expect(loadModel.error).toBe(null);
		expect(loadModel.reload).toEqual(expect.any(Function));
	});

	test("sets ready resource after successful load", async () => {
		const loadedData = [{ id: "one" }];
		const execute = jest.fn(async () => loadedData);
		const onLoaded = jest.fn();

		useLoadModel({
			execute,
			emptyData: [],
			errorFallbackMessage: "Kunne ikke laste.",
			onLoaded
		});

		await flushPromises();

		expect(execute).toHaveBeenCalledWith();
		expect(stateSetters[0]).toHaveBeenNthCalledWith(1, expect.any(Function));
		expect(stateSetters[0]).toHaveBeenNthCalledWith(2, {
			status: LOAD_STATUS.READY,
			data: loadedData,
			error: null
		});
		expect(onLoaded).toHaveBeenCalledWith({ loadedData });
	});

	test("uses reloading status after first successful load", () => {
		const previousData = [{ id: "old" }];
		const previousResource = {
			status: LOAD_STATUS.READY,
			data: previousData,
			error: null
		};

		refValues.push({ current: true });
		stateValues.push(previousResource);

		useLoadModel({
			execute: jest.fn(() => new Promise(() => {})),
			emptyData: [],
			errorFallbackMessage: "Kunne ikke laste.",
			onLoaded: jest.fn()
		});

		const updateInFlightResource = stateSetters[0].mock.calls[0][0];
		const inFlightResource = updateInFlightResource(previousResource);

		expect(inFlightResource).toEqual({
			status: LOAD_STATUS.RELOADING,
			data: previousData,
			error: null
		});
	});

	test("sets fallback error when load fails without message", async () => {
		const previousData = [{ id: "old" }];
		const previousResource = {
			status: LOAD_STATUS.LOADING,
			data: previousData,
			error: null
		};
		const execute = jest.fn(async () => {
			throw null;
		});
		const onLoaded = jest.fn();

		useLoadModel({
			execute,
			emptyData: previousData,
			errorFallbackMessage: "Kunne ikke laste.",
			onLoaded
		});

		await flushPromises();

		const updateFailedResource = stateSetters[0].mock.calls[1][0];
		const failedResource = updateFailedResource(previousResource);

		expect(failedResource).toEqual({
			status: LOAD_STATUS.ERROR,
			data: previousData,
			error: "Kunne ikke laste."
		});
		expect(onLoaded).not.toHaveBeenCalled();
	});

	test("sets fallback error when load fails with technical message", async () => {
		const execute = jest.fn(async () => {
			throw new Error("API svarte 500.");
		});

		useLoadModel({
			execute,
			emptyData: [],
			errorFallbackMessage: "Kunne ikke laste.",
			onLoaded: jest.fn()
		});

		await flushPromises();

		const updateFailedResource = stateSetters[0].mock.calls[1][0];
		const failedResource = updateFailedResource({
			status: LOAD_STATUS.LOADING,
			data: [],
			error: null
		});

		expect(failedResource.error).toBe("Kunne ikke laste.");
	});

	test("ignores completed loads after cleanup", async () => {
		let resolveLoad;
		const execute = jest.fn(() => new Promise((resolve) => {
			resolveLoad = resolve;
		}));
		const onLoaded = jest.fn();

		useLoadModel({
			execute,
			emptyData: [],
			errorFallbackMessage: "Kunne ikke laste.",
			onLoaded
		});

		effectCleanups[0]();
		resolveLoad([{ id: "one" }]);
		await flushPromises();

		expect(stateSetters[0]).toHaveBeenCalledTimes(1);
		expect(onLoaded).not.toHaveBeenCalled();
	});
});
