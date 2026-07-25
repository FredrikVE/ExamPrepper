// test/ui/view/components/FlipcardsPage/flipcardParentheticalTermContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const CARD_FACES_SOURCE_PATH = path.resolve("src/ui/view/components/FlipcardsPage/FlipcardDeck/CardFaces.jsx");
const CARD_STACK_SOURCE_PATH = path.resolve("src/ui/view/components/FlipcardsPage/FlipcardDeck/CardStack.jsx");
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

describe("Flipcard parenthetical term presentation", () => {
	test("uses the same term renderer for the active card and stacked preview", () => {
		const cardFacesSource = fs.readFileSync(CARD_FACES_SOURCE_PATH, "utf8");
		const cardStackSource = fs.readFileSync(CARD_STACK_SOURCE_PATH, "utf8");

		expect(cardFacesSource).toContain('<FlipcardTerm className={titleClassName} presentation={props.termPresentation} />');
		expect(cardStackSource).toContain('<FlipcardTerm className="card-stack-title" presentation={props.nextCard.termPresentation} />');
	});

	test("renders the trailing parenthetical segment as a separate line", () => {
		const root = postcss.parse(fs.readFileSync(CARD_FACES_STYLE_PATH, "utf8"), { from: CARD_FACES_STYLE_PATH });
		const primary = readDeclarations(root, ".flipcard-term-primary");
		const parenthetical = readDeclarations(root, ".flipcard-term-parenthetical");

		expect(primary.display).toBe("block");
		expect(parenthetical.display).toBe("block");
		expect(parenthetical["margin-top"]).toBe("0.3em");
	});
});
