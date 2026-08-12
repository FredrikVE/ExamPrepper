import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const DETAIL_MODAL_DIRECTORY = path.resolve("src/ui/view/components/GlossaryPage/DetailModal");
const DETAIL_MODAL_STYLE_DIRECTORY = path.resolve("src/ui/style/GlossaryPage/DetailModal");
const GLOSSARY_STYLE_INDEX_PATH = path.resolve("src/ui/style/GlossaryPage/index.css");
const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");

function readSource(fileName) {
	return fs.readFileSync(path.join(DETAIL_MODAL_DIRECTORY, fileName), "utf8");
}

function readStyle(fileName) {
	return fs.readFileSync(path.join(DETAIL_MODAL_STYLE_DIRECTORY, fileName), "utf8");
}

function readDeclarations(fileName, selector) {
	const root = postcss.parse(readStyle(fileName));
	let declarations = null;

	root.walkRules((rule) => {
		if (rule.selector !== selector) {
			return;
		}

		declarations = {};
		rule.walkDecls((declaration) => {
			declarations[declaration.prop] = declaration.value;
		});
	});

	return declarations;
}

describe("Glossary detail modal layout", () => {
	test("renders the glossary detail dialog as a controlled Base UI portal", () => {
		const source = readSource("GlossaryDetailModal.jsx");

		expect(source).toContain("<Dialog.Root open={model.isOpen} onOpenChange={model.onOpenChange} onOpenChangeComplete={model.onOpenChangeComplete}>");
		expect(source).toContain("<Dialog.Portal>");
		expect(source).toContain('className="glossary-detail-modal__backdrop"');
		expect(source).toContain('className="glossary-detail-modal__viewport"');
		expect(source).toContain('className="glossary-detail-modal__popup"');
		expect(source).toContain("initialFocus={model.initialFocus}");
		expect(source).toContain("finalFocus={model.finalFocus}");
		expect(source).not.toMatch(/useState|useEffect|useRef|useMemo|useCallback/);
	});

	test("keeps the sheet composition modular without section-wrapper fragmentation", () => {
		const sheetSource = readSource("GlossaryDetailSheet.jsx");
		const headerSource = readSource("GlossaryDetailHeader.jsx");
		const contentSource = readSource("GlossaryDetailContent.jsx");
		const networkSource = readSource("GlossaryDetailNetworkSection.jsx");
		const navigationSource = readSource("GlossaryDetailNavigation.jsx");

		expect(sheetSource).toContain('className="glossary-detail-modal__sheet" inert={!model.isInteractive}');
		expect(sheetSource).toContain("<GlossaryDetailHeader model={model.header} />");
		expect(sheetSource).toContain("<GlossaryDetailContent model={model} isInteractive={model.isInteractive} />");
		expect(contentSource).toContain("<GlossaryDetailNetworkSection model={model.network} />");
		expect(sheetSource).toContain("<GlossaryDetailNavigation model={model.navigation} />");
		expect(sheetSource).toContain("<FormattedText text={model.explanation.text} />");
		expect(contentSource).toContain("onClick={item.onActivate}");
		expect(headerSource).toContain("<Dialog.Title");
		expect(headerSource).toContain("<Dialog.Description");
		expect(headerSource).toContain("<Dialog.Close");
		expect(networkSource).toContain("GLOSSARY_NETWORK_DISPLAY_KIND.LOADING");
		expect(networkSource).toContain("GLOSSARY_NETWORK_DISPLAY_KIND.ERROR");
		expect(networkSource).toContain("<ConceptNetwork");
		expect(navigationSource).toContain("disabled={model.previous.isDisabled}");
		expect(navigationSource).toContain("disabled={model.next.isDisabled}");
		expect(navigationSource).toContain('aria-live="polite"');
		expect(fs.existsSync(path.join(DETAIL_MODAL_DIRECTORY, "GlossaryDetailExplanation.jsx"))).toBe(false);
		expect(fs.existsSync(path.join(DETAIL_MODAL_DIRECTORY, "GlossaryDetailAssociations.jsx"))).toBe(false);
	});

	test("uses the canonical modal theme and global layer tokens", () => {
		const shell = readDeclarations("modal-shell.css", ".glossary-detail-modal__popup");
		const backdrop = readDeclarations("modal-shell.css", ".glossary-detail-modal__backdrop");
		const viewport = readDeclarations("modal-shell.css", ".glossary-detail-modal__viewport");
		const tokens = fs.readFileSync(TOKENS_PATH, "utf8");

		expect(backdrop.background).toBe("var(--modal-backdrop-bg)");
		expect(backdrop["z-index"]).toBe("var(--z-modal-backdrop)");
		expect(viewport["z-index"]).toBe("var(--z-modal-dialog)");
		expect(shell.background).toBe("var(--panel-strong)");
		expect(shell.border).toBe("1px solid var(--line-strong)");
		expect(shell["box-shadow"]).toBe("var(--shadow-card)");
		expect(tokens).toContain("--modal-backdrop-bg:");
		expect(tokens).toContain("--z-modal-backdrop:");
		expect(tokens).toContain("--z-modal-dialog:");
	});

	test("keeps only the detail body scrollable inside the modal sheet", () => {
		const popup = readDeclarations("modal-shell.css", ".glossary-detail-modal__popup");
		const body = readDeclarations("modal-content.css", ".glossary-detail-modal__body");
		const navigation = readDeclarations("modal-navigation.css", ".glossary-detail-modal__navigation");
		const styleIndex = fs.readFileSync(GLOSSARY_STYLE_INDEX_PATH, "utf8");

		expect(popup.overflow).toBe("hidden");
		expect(body["overflow-y"]).toBe("auto");
		expect(navigation.flex).toBe("none");
		expect(styleIndex).toContain('@import "./DetailModal/index.css";');
	});
});
