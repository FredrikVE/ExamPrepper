import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const CARD_FACES_STYLE_PATH = path.resolve("src/ui/style/FlipcardsPage/FlipcardDeck/card-faces.css");

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
	test("uses one hyphenation contract for terms, definitions and the stacked preview", () => {
		const root = postcss.parse(fs.readFileSync(CARD_FACES_STYLE_PATH, "utf8"), { from: CARD_FACES_STYLE_PATH });

		for (const selector of [".flip-title", ".flip-definition", ".card-stack-title"]) {
			const declarations = readDeclarations(root, selector);

			expect(declarations["overflow-wrap"]).toBe("anywhere");
			expect(declarations["word-break"]).toBe("normal");
			expect(declarations.hyphens).toBe("auto");
		}
	});
});
