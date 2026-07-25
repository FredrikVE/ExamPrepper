// test/ui/view/components/FlipcardsPage/flipcardHyphenationContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const CARD_FACES_STYLE_PATH = path.resolve("src/ui/style/FlipcardsPage/FlipcardDeck/card-faces.css");
const CARD_STACK_STYLE_PATH = path.resolve("src/ui/style/FlipcardsPage/FlipcardDeck/card-stack.css");
const FLIPCARD_MODEL_PATH = path.resolve("src/ui/viewmodel/FlipcardsPage/glossaryEntryFlipcardModel.js");
const FLIPCARD_TERM_SOURCE_PATH = path.resolve("src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardTerm.jsx");

function readDeclarations(root, selector) {
	const declarations = {};

	root.walkRules((rule) => {
		const selectors = rule.selectors ?? [];

		if (!selectors.includes(selector)) {
			return;
		}

		rule.walkDecls((declaration) => {
			declarations[declaration.prop] = declaration.value;
		});
	});

	return declarations;
}

describe("Flipcard language-aware wrapping", () => {
	test("uses only model-provided soft hyphens for terms", () => {
		const faceRoot = postcss.parse(fs.readFileSync(CARD_FACES_STYLE_PATH, "utf8"), { from: CARD_FACES_STYLE_PATH });
		const stackRoot = postcss.parse(fs.readFileSync(CARD_STACK_STYLE_PATH, "utf8"), { from: CARD_STACK_STYLE_PATH });
		const flipTitle = readDeclarations(faceRoot, ".flip-title");
		const stackTitle = readDeclarations(stackRoot, ".card-stack-title");
		const definition = readDeclarations(faceRoot, ".flip-definition");

		for (const declarations of [flipTitle, stackTitle]) {
			expect(declarations["overflow-wrap"]).toBe("normal");
			expect(declarations["word-break"]).toBe("normal");
			expect(declarations.hyphens).toBe("manual");
		}

		expect(definition["overflow-wrap"]).toBe("anywhere");
		expect(definition["word-break"]).toBe("normal");
		expect(definition.hyphens).toBe("auto");
	});

	test("derives term presentation once in the Flipcards presentation model", () => {
		const modelSource = fs.readFileSync(FLIPCARD_MODEL_PATH, "utf8");
		const termSource = fs.readFileSync(FLIPCARD_TERM_SOURCE_PATH, "utf8");

		expect(modelSource).toContain("createNorwegianCompoundLexicon");
		expect(modelSource).toContain("createFlipcardTermPresentation");
		expect(modelSource).toContain("termPresentation:");
		expect(termSource).not.toContain("norwegianCompoundSegmentation");
		expect(termSource).not.toContain("insertNorwegianCompoundBreaks");
	});
});
