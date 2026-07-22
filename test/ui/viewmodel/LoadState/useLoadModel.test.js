// test/ui/viewmodel/LoadState/useLoadModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";

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
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
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
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded
		});

		await flushPromises();

		expect(execute).toHaveBeenCalledWith();
		expect(stateSetters[0]).toHaveBeenNthCalledWith(1, expect.any(Function));
		expect(stateSetters[0]).toHaveBeenNthCalledWith(2, {
			status: LOAD_STATUS.READY,
			data: loadedData
		});
		expect(onLoaded).toHaveBeenCalledWith({ loadedData });
	});

	test("allows an explicit null onLoaded callback", async () => {
		const loadedData = [{ id: "one" }];
		const execute = jest.fn(async () => loadedData);

		useLoadModel({
			execute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: null
		});

		await flushPromises();

		expect(execute).toHaveBeenCalledWith();
		expect(stateSetters[0]).toHaveBeenNthCalledWith(2, {
			status: LOAD_STATUS.READY,
			data: loadedData
		});
	});

	test("keeps ready status with previous data during refresh after first successful load", () => {
		const previousData = [{ id: "old" }];
		const previousResource = {
			status: LOAD_STATUS.READY,
			data: previousData
		};

		refValues.push({ current: true });
		stateValues.push(previousResource);

		useLoadModel({
			execute: jest.fn(() => new Promise(() => {})),
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: jest.fn()
		});

		const updateInFlightResource = stateSetters[0].mock.calls[0][0];
		const inFlightResource = updateInFlightResource(previousResource);

		expect(inFlightResource).toEqual({
			status: LOAD_STATUS.READY,
			data: previousData
		});
	});

	test("sets error status when load fails without message", async () => {
		const previousData = [{ id: "old" }];
		const previousResource = {
			status: LOAD_STATUS.LOADING,
			data: previousData
		};
		const execute = jest.fn(async () => {
			throw null;
		});
		const onLoaded = jest.fn();

		useLoadModel({
			execute,
			emptyData: previousData,
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded
		});

		await flushPromises();

		const updateFailedResource = stateSetters[0].mock.calls[1][0];
		const failedResource = updateFailedResource(previousResource);

		expect(failedResource).toEqual({
			status: LOAD_STATUS.ERROR,
			data: previousData
		});
		expect(onLoaded).not.toHaveBeenCalled();
	});

	test("returns product error text and never the technical message when status is error", async () => {
		const execute = jest.fn(async () => {
			throw new Error("API svarte 500.");
		});

		stateValues.push({
			status: LOAD_STATUS.ERROR,
			data: []
		});

		const loadModel = useLoadModel({
			execute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: jest.fn()
		});

		await flushPromises();

		expect(loadModel.error).toBe("Kunne ikke laste.");
	});

	test("returns current error text so a language switch updates the message without reload", () => {
		const erroredResource = {
			status: LOAD_STATUS.ERROR,
			data: []
		};

		stateValues.push(erroredResource);

		const norwegianModel = useLoadModel({
			execute: jest.fn(() => new Promise(() => {})),
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: jest.fn()
		});

		stateValues.push(erroredResource);

		const englishModel = useLoadModel({
			execute: jest.fn(() => new Promise(() => {})),
			emptyData: [],
			errorMessage: "Could not load.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: jest.fn()
		});

		expect(norwegianModel.error).toBe("Kunne ikke laste.");
		expect(englishModel.error).toBe("Could not load.");
	});

	test("does not execute or write while disabled", () => {
		const execute = jest.fn();

		useLoadModel({
			execute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: false,
			onLoaded: null
		});

		expect(execute).not.toHaveBeenCalled();
		expect(stateSetters[0]).not.toHaveBeenCalled();
	});

	test("resets to loading with empty data when resourceKey changes", () => {
		const previousData = [{ id: "old" }];
		const previousResource = {
			status: LOAD_STATUS.READY,
			data: previousData
		};

		refValues.push(
			{ current: true },
			{ current: 4 },
			{ current: "resource-a" },
			{ current: [] },
			{ current: null }
		);
		stateValues.push(previousResource);

		useLoadModel({
			execute: jest.fn(() => new Promise(() => {})),
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-b",
			isEnabled: true,
			onLoaded: null
		});

		const updateInFlightResource = stateSetters[0].mock.calls[0][0];

		expect(updateInFlightResource(previousResource)).toEqual({
			status: LOAD_STATUS.LOADING,
			data: []
		});
	});

	test("runs a first load when a disabled model becomes enabled", () => {
		const execute = jest.fn(() => new Promise(() => {}));
		const hasLoadedOnceRef = { current: false };
		const activeRunIdRef = { current: 0 };
		const activeResourceKeyRef = { current: "resource-a" };
		const emptyDataRef = { current: [] };
		const onLoadedRef = { current: null };

		refValues.push(hasLoadedOnceRef, activeRunIdRef, activeResourceKeyRef, emptyDataRef, onLoadedRef);
		useLoadModel({
			execute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: false,
			onLoaded: null
		});

		refValues.push(hasLoadedOnceRef, activeRunIdRef, activeResourceKeyRef, emptyDataRef, onLoadedRef);
		useLoadModel({
			execute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: null
		});

		expect(execute).toHaveBeenCalledTimes(1);
		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[1]).toHaveBeenCalledWith(expect.any(Function));
	});

	test("ignores a late response from an older resourceKey", async () => {
		let resolveFirstLoad;
		let resolveSecondLoad;
		const firstExecute = jest.fn(() => new Promise((resolve) => {
			resolveFirstLoad = resolve;
		}));
		const secondExecute = jest.fn(() => new Promise((resolve) => {
			resolveSecondLoad = resolve;
		}));
		const hasLoadedOnceRef = { current: false };
		const activeRunIdRef = { current: 0 };
		const activeResourceKeyRef = { current: "resource-a" };
		const emptyDataRef = { current: [] };
		const onLoadedRef = { current: null };

		refValues.push(hasLoadedOnceRef, activeRunIdRef, activeResourceKeyRef, emptyDataRef, onLoadedRef);
		useLoadModel({
			execute: firstExecute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded: null
		});

		refValues.push(hasLoadedOnceRef, activeRunIdRef, activeResourceKeyRef, emptyDataRef, onLoadedRef);
		useLoadModel({
			execute: secondExecute,
			emptyData: [],
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-b",
			isEnabled: true,
			onLoaded: null
		});

		resolveSecondLoad([{ id: "new" }]);
		await flushPromises();
		resolveFirstLoad([{ id: "old" }]);
		await flushPromises();

		expect(stateSetters[1]).toHaveBeenLastCalledWith({
			status: LOAD_STATUS.READY,
			data: [{ id: "new" }]
		});
		expect(stateSetters[0]).toHaveBeenCalledTimes(1);
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
			errorMessage: "Kunne ikke laste.",
			resourceKey: "resource-a",
			isEnabled: true,
			onLoaded
		});

		effectCleanups[0]();
		resolveLoad([{ id: "one" }]);
		await flushPromises();

		expect(stateSetters[0]).toHaveBeenCalledTimes(1);
		expect(onLoaded).not.toHaveBeenCalled();
	});
});
