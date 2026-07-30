//test/ui/architecture/dataSourceNaming.test.js
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataSourceDirectory = path.resolve(testDirectory, "../../../src/model/datasource");

describe("DataSource naming", () => {
	test("does not use the redundant Api prefix", () => {
		const prefixedFiles = readdirSync(dataSourceDirectory)
			.filter((fileName) => fileName.endsWith("DataSource.js"))
			.filter((fileName) => fileName.startsWith("Api"));

		expect(prefixedFiles).toEqual([]);
	});
});
