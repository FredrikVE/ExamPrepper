// test/ui/viewmodel/ExamPage/formatElapsedTime.test.js
import { describe, expect, test } from "@jest/globals";
import formatElapsedTime from "../../../../src/ui/viewmodel/ExamPage/formatElapsedTime.js";

describe("formatElapsedTime", () => {
	test("formats seconds as mm:ss", () => {
		expect(formatElapsedTime(0)).toBe("00:00");
		expect(formatElapsedTime(9)).toBe("00:09");
		expect(formatElapsedTime(75)).toBe("01:15");
		expect(formatElapsedTime(3605)).toBe("60:05");
	});

	test("clamps negative elapsed seconds to zero", () => {
		expect(formatElapsedTime(-4)).toBe("00:00");
	});
});
