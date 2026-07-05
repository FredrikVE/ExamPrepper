// test/ui/viewmodel/LoadState/combineLoadStatuses.test.js
import { describe, expect, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/loadStatus/loadStatus.js";
import combineLoadStatuses from "../../../../src/ui/viewmodel/LoadState/combineLoadStatuses.js";

describe("combineLoadStatuses", () => {
	test("returns ready when all resources are ready", () => {
		const status = combineLoadStatuses([
			LOAD_STATUS.READY,
			LOAD_STATUS.READY
		]);

		expect(status).toBe(LOAD_STATUS.READY);
	});

	test("returns reloading when at least one resource is reloading", () => {
		const status = combineLoadStatuses([
			LOAD_STATUS.READY,
			LOAD_STATUS.RELOADING
		]);

		expect(status).toBe(LOAD_STATUS.RELOADING);
	});

	test("returns loading before reloading", () => {
		const status = combineLoadStatuses([
			LOAD_STATUS.RELOADING,
			LOAD_STATUS.LOADING
		]);

		expect(status).toBe(LOAD_STATUS.LOADING);
	});

	test("returns error before loading", () => {
		const status = combineLoadStatuses([
			LOAD_STATUS.LOADING,
			LOAD_STATUS.ERROR,
			LOAD_STATUS.RELOADING
		]);

		expect(status).toBe(LOAD_STATUS.ERROR);
	});

	test("returns ready when there are no resources", () => {
		const status = combineLoadStatuses([]);

		expect(status).toBe(LOAD_STATUS.READY);
	});
});
