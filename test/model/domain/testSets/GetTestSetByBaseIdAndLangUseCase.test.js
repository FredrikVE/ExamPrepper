// test/model/domain/testSets/GetTestSetByBaseIdAndLangUseCase.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GetTestSetByBaseIdAndLangUseCase from "../../../../src/model/domain/testSets/GetTestSetByBaseIdAndLangUseCase.js";

describe("GetTestSetByBaseIdAndLangUseCase", () => {
	let repository;
	let useCase;

	beforeEach(() => {
		repository = {
			getTestSetByBaseIdAndLang: jest.fn()
		};

		useCase = new GetTestSetByBaseIdAndLangUseCase(repository);
	});

	test("delegates baseId and lang to repository", async () => {
		repository.getTestSetByBaseIdAndLang.mockReturnValue({
			id: "mock-exam-1-en"
		});

		const result = await useCase.execute({
			baseId: "mock-exam-1",
			lang: "en",
			subjectId: "in5431"
		});

		expect(result).toEqual({ id: "mock-exam-1-en" });
		expect(repository.getTestSetByBaseIdAndLang).toHaveBeenCalledWith({
			baseId: "mock-exam-1",
			language: "en",
			subjectId: "in5431"
		});
	});

	test("returns null when baseId is missing", () => {
		const result = useCase.execute({
			lang: "en",
			subjectId: "in5431"
		});

		expect(result).toBeNull();
		expect(repository.getTestSetByBaseIdAndLang).not.toHaveBeenCalled();
	});

	test("returns null when lang is missing", () => {
		const result = useCase.execute({
			baseId: "mock-exam-1",
			subjectId: "in5431"
		});

		expect(result).toBeNull();
		expect(repository.getTestSetByBaseIdAndLang).not.toHaveBeenCalled();
	});
	test("returns null when subjectId is missing", () => {
		const result = useCase.execute({
			baseId: "mock-exam-1",
			lang: "en"
		});

		expect(result).toBeNull();
		expect(repository.getTestSetByBaseIdAndLang).not.toHaveBeenCalled();
	});

});
