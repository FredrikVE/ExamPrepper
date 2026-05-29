// test/model/domain/GetExamByBaseIdAndLangUseCase.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GetExamByBaseIdAndLangUseCase from "../../../src/model/domain/GetExamByBaseIdAndLangUseCase.js";

describe("GetExamByBaseIdAndLangUseCase", () => {
	let repository;
	let useCase;

	beforeEach(() => {
		repository = {
			getExamByBaseIdAndLang: jest.fn()
		};

		useCase = new GetExamByBaseIdAndLangUseCase(repository);
	});

	test("delegates baseId and lang to repository", async () => {
		repository.getExamByBaseIdAndLang.mockReturnValue({
			id: "mock-exam-1-en"
		});

		const result = await useCase.execute({
			baseId: "mock-exam-1",
			lang: "en"
		});

		expect(result).toEqual({ id: "mock-exam-1-en" });
		expect(repository.getExamByBaseIdAndLang).toHaveBeenCalledWith("mock-exam-1", "en");
	});

	test("returns null when baseId is missing", () => {
		const result = useCase.execute({
			lang: "en"
		});

		expect(result).toBeNull();
		expect(repository.getExamByBaseIdAndLang).not.toHaveBeenCalled();
	});

	test("returns null when lang is missing", () => {
		const result = useCase.execute({
			baseId: "mock-exam-1"
		});

		expect(result).toBeNull();
		expect(repository.getExamByBaseIdAndLang).not.toHaveBeenCalled();
	});
});