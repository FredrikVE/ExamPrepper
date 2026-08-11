// test/model/domain/GetGlossaryOverviewUseCase.test.js
import { describe, expect, jest, test } from "@jest/globals";
import GetGlossaryOverviewUseCase from "../../../src/model/domain/GetGlossaryOverviewUseCase.js";

describe("GetGlossaryOverviewUseCase", () => {
	test("loads the canonical overview for one subject", async () => {
		const concepts = [{ glossaryEntryKey: "tls" }];
		const repository = {
			getGlossaryOverview: jest.fn().mockResolvedValue(concepts)
		};
		const useCase = new GetGlossaryOverviewUseCase(repository);

		await expect(useCase.execute({ subjectId: "in2120" })).resolves.toEqual(concepts);
		expect(repository.getGlossaryOverview).toHaveBeenCalledWith({ subjectId: "in2120" });
	});
});
