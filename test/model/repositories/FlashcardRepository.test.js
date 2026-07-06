// test/model/repositories/FlashcardRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import FlashcardRepository from "../../../src/model/repositories/FlashcardRepository.js";

describe("FlashcardRepository", () => {
	let conceptRepository;
	let repository;

	beforeEach(() => {
		conceptRepository = {
			getConceptsBySubject: jest.fn().mockResolvedValue([
				{
					id: "card-1",
					term: {
						no: "Begrep",
						en: "Term"
					},
					explanation: {
						no: "Norsk forklaring",
						en: "English explanation"
					},
					topicAreaKey: "begreper"
				}
			])
		};

		repository = new FlashcardRepository(conceptRepository);
	});

	test("fetches concepts for subject", async () => {
		await repository.getFlashcardsBySubject({ subjectId: "in5431" });

		expect(conceptRepository.getConceptsBySubject).toHaveBeenCalledWith({ subjectId: "in5431" });
	});

	test("returns bilingual flashcards from concepts", async () => {
		const result = await repository.getFlashcardsBySubject({ subjectId: "in5431" });

		expect(result[0]).toEqual({
			id: "card-1",
			term: {
				no: "Begrep",
				en: "Term"
			},
			definition: {
				no: "Norsk forklaring",
				en: "English explanation"
			},
			topicAreaKey: "begreper"
		});
	});
});
