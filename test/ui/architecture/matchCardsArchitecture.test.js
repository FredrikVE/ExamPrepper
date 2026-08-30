// test/ui/architecture/matchCardsArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const MATCH_CARDS_PAGE_PATH = path.resolve("src/ui/view/pages/MatchCardsPage.jsx");
const LEARNING_SESSION_PAGE_PATH = path.resolve("src/ui/view/pages/LearningSessionPage.jsx");
const MATCH_CARDS_COMPONENT_ROOT = path.resolve("src/ui/view/components/MatchCards");
const MATCH_CARDS_VIEWMODEL_ROOT = path.resolve("src/ui/viewmodel/MatchCards");
const MATCH_CARDS_ROUND_MODEL_PATH = path.join(MATCH_CARDS_VIEWMODEL_ROOT, "useMatchCardsRoundModel.js");
const APP_STYLE_PATH = path.resolve("src/ui/style/App.css");
const MATCH_CARDS_PAGE_STYLE_PATH = path.resolve("src/ui/style/MatchCardsPage/index.css");

function readSource(filePath) {
	return fs.readFileSync(filePath, "utf8");
}

function collectFiles(directoryPath, extensions) {
	const filePaths = [];

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			filePaths.push(...collectFiles(entryPath, extensions));
			continue;
		}

		if (extensions.has(path.extname(entry.name))) {
			filePaths.push(entryPath);
		}
	}

	return filePaths;
}

describe("MatchCards architecture", () => {
	test("keeps MatchCardsPage as a consumer of the shared MatchCards renderer", () => {
		const pageSource = readSource(MATCH_CARDS_PAGE_PATH);

		expect(pageSource).toContain('import MatchCardsGrid from "../components/MatchCards/MatchCardsGrid.jsx";');
	});

	test("keeps LearningSession as a consumer of the shared MatchCards renderer", () => {
		const pageSource = readSource(LEARNING_SESSION_PAGE_PATH);

		expect(pageSource).toContain('import MatchCardsGrid from "../components/MatchCards/MatchCardsGrid.jsx";');
		expect(pageSource).not.toContain("components/MatchCardsPage/");
	});

	test("keeps shared MatchCards components independent of page-owned code", () => {
		for (const componentPath of collectFiles(MATCH_CARDS_COMPONENT_ROOT, new Set([".js", ".jsx"]))) {
			const componentSource = readSource(componentPath);

			expect(componentSource).not.toContain("MatchCardsPage/");
			expect(componentSource).not.toContain("view/pages/");
		}
	});

	test("keeps round-state independent of page and transport owners", () => {
		const roundModelSource = readSource(MATCH_CARDS_ROUND_MODEL_PATH);
		const forbiddenFragments = [
			"MatchCardsPage",
			"model/datasource",
			"model/repositories",
			"navigation/",
			"di/"
		];

		for (const forbiddenFragment of forbiddenFragments) {
			expect(roundModelSource).not.toContain(forbiddenFragment);
		}
	});

	test("loads shared MatchCards CSS through App.css and keeps page CSS page-owned", () => {
		const appStyleSource = readSource(APP_STYLE_PATH);
		const pageStyleSource = readSource(MATCH_CARDS_PAGE_STYLE_PATH);

		expect(appStyleSource).toContain('@import "./MatchCards/index.css";');
		expect(pageStyleSource).toContain('@import "./page.css";');
		expect(pageStyleSource).toContain('@import "./responsive.css";');
		expect(pageStyleSource).not.toContain("board.css");
		expect(pageStyleSource).not.toContain("card.css");
		expect(pageStyleSource).not.toContain("tokens.css");
	});
});
