// test/ui/architecture/glossaryViewModelOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_PAGE_PATH = path.resolve("src/ui/view/pages/GlossaryPage.jsx");
const GLOSSARY_COMPONENT_DIRECTORY = path.resolve("src/ui/view/components/GlossaryPage");
const GLOSSARY_VIEWMODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const SUBMODEL_NAMES = ["useGlossarySearchModel", "useGlossaryDetailModel", "useGlossaryTopicAreaSelectionModel"];

function collectJsxFiles(directory) {
	const files = [];
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectJsxFiles(entryPath));
		} else if (entry.name.endsWith(".jsx")) {
			files.push(entryPath);
		}
	}
	return files;
}

describe("Glossary ViewModel ownership", () => {
	test("keeps private Glossary submodels behind the page ViewModel contract", () => {
		const viewModelSource = fs.readFileSync(GLOSSARY_VIEWMODEL_PATH, "utf8");
		for (const submodelName of SUBMODEL_NAMES) {
			expect(viewModelSource).toContain(submodelName);
		}

		for (const filePath of [GLOSSARY_PAGE_PATH, ...collectJsxFiles(GLOSSARY_COMPONENT_DIRECTORY)]) {
			const source = fs.readFileSync(filePath, "utf8");
			for (const submodelName of SUBMODEL_NAMES) {
				expect(source).not.toContain(submodelName);
			}
		}
	});
});
