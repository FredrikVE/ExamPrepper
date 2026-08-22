import { describe, expect, test, jest } from "@jest/globals";
import SubmitExamAttemptUseCase from "../../../src/model/domain/SubmitExamAttemptUseCase.js";

describe("SubmitExamAttemptUseCase", () => {
	test("clears LearningPath user state after a saved attempt", async () => {
		const attempt = { id: "attempt-1" };
		const examAttemptRepository = { submitAttempt: jest.fn(async () => attempt) };
		const learningPathRepository = { clearUserState: jest.fn() };
		const useCase = new SubmitExamAttemptUseCase(examAttemptRepository, learningPathRepository);

		await expect(useCase.execute({ examId: "chapter-1-test-no" })).resolves.toBe(attempt);
		expect(learningPathRepository.clearUserState).toHaveBeenCalledTimes(1);
	});

	test("keeps LearningPath cache when saving the attempt fails", async () => {
		const examAttemptRepository = { submitAttempt: jest.fn(async () => { throw new Error("save failed"); }) };
		const learningPathRepository = { clearUserState: jest.fn() };
		const useCase = new SubmitExamAttemptUseCase(examAttemptRepository, learningPathRepository);

		await expect(useCase.execute({ examId: "chapter-1-test-no" })).rejects.toThrow("save failed");
		expect(learningPathRepository.clearUserState).not.toHaveBeenCalled();
	});
});
