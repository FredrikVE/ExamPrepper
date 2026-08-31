// test/model/domain/glossary/GetGlossaryNetworkUseCase.test.js
import { describe, expect, jest, test } from "@jest/globals";
import GetGlossaryNetworkUseCase from "../../../../src/model/domain/glossary/GetGlossaryNetworkUseCase.js";

describe("GetGlossaryNetworkUseCase", () => {
	test("loads a network by stable glossary identity", async () => {
		const network = { center: { glossaryEntryKey: "tls" }, nodes: [], relations: [] };
		const repository = {
			getGlossaryNetwork: jest.fn().mockResolvedValue(network)
		};
		const useCase = new GetGlossaryNetworkUseCase(repository);

		await expect(useCase.execute({
			subjectId: "in2120",
			glossaryEntryKey: "tls"
		})).resolves.toEqual(network);
		expect(repository.getGlossaryNetwork).toHaveBeenCalledWith({
			subjectId: "in2120",
			glossaryEntryKey: "tls"
		});
	});
});
