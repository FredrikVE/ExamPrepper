import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");
const STYLE_DIRECTORY = path.resolve("src/ui/style");
const GLOBAL_LAYER_CONTRACT = {
	".workspace-scaffold": "var(--z-app-content)",
	".scaffold-header": "var(--z-scaffold-header)",
	".search-backdrop": "var(--z-search-backdrop)",
	".workspace-scaffold-footer-overlay": "var(--z-workspace-footer-overlay)",
	".mobile-bottom-sheet-backdrop": "var(--z-mobile-sheet-backdrop)",
	".mobile-bottom-sheet-viewport": "var(--z-mobile-sheet-viewport)",
	".mobile-dropdown-backdrop": "var(--z-navigation-backdrop)",
	".mobile-dropdown": "var(--z-navigation-panel)",
	".mobile-topbar": "var(--z-mobile-topbar)",
	".exam-submit-confirmation-overlay": "var(--z-exam-submit-confirmation)",
	".settings-sidebar": "var(--z-settings-dialog)"
};

function collectCssFiles(directory) {
	const files = [];
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectCssFiles(entryPath));
			continue;
		}

		if (entry.name.endsWith(".css")) {
			files.push(entryPath);
		}
	}
	return files;
}

function collectSelectorLayers() {
	const layers = new Map();
	for (const filePath of collectCssFiles(STYLE_DIRECTORY)) {
		const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });
		root.walkRules((rule) => {
			const zIndex = rule.nodes.find((node) => node.type === "decl" && node.prop === "z-index");
			if (zIndex === undefined) {
				return;
			}

			selectorParser((selectorRoot) => {
				selectorRoot.each((selector) => layers.set(selector.toString(), zIndex.value));
			}).processSync(rule.selector);
		});
	}
	return layers;
}

describe("global layer policy", () => {
	test("declares every proven global token in Tokens.css", () => {
		const root = postcss.parse(fs.readFileSync(TOKENS_PATH, "utf8"), { from: TOKENS_PATH });
		const declarations = new Map();
		root.walkDecls((declaration) => declarations.set(declaration.prop, declaration.value));

		const expectedTokens = new Set();
		for (const value of Object.values(GLOBAL_LAYER_CONTRACT)) {
			expectedTokens.add(value.slice(4, -1));
		}

		for (const token of expectedTokens) {
			expect(declarations.has(token)).toBe(true);
		}
	});

	test("binds each global participant to its explicit token", () => {
		const layers = collectSelectorLayers();
		for (const [selector, token] of Object.entries(GLOBAL_LAYER_CONTRACT)) {
			expect(layers.get(selector)).toBe(token);
		}
	});

	test("keeps DesktopPopOutMenu as an intentionally local three-layer contract", () => {
		const layers = collectSelectorLayers();
		expect(layers.get(".desktop-pop-out-menu__backdrop")).toBe("81");
		expect(layers.get(".desktop-pop-out-menu__panel")).toBe("82");
		expect(layers.get(".desktop-pop-out-menu__trigger")).toBe("83");
	});
});
