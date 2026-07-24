import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";
import { NAV_ITEMS } from "../../../src/navigation/navigation.js";

function isTranslationKeyProperty(property) {
	return property.endsWith("Key") && property !== "iconKey";
}

function collectTranslationKeys(value, keys) {
	if (Array.isArray(value)) {
		for (const item of value) {
			collectTranslationKeys(item, keys);
		}
		return;
	}

	if (value === null || typeof value !== "object") {
		return;
	}

	for (const [property, child] of Object.entries(value)) {
		if (isTranslationKeyProperty(property)) {
			keys.add(child);
		}
		collectTranslationKeys(child, keys);
	}
}

describe("i18n contract", () => {
	test("uses LANGUAGES as the only translation-map keys", () => {
		expect(Object.keys(translations).sort()).toEqual([LANGUAGES.EN, LANGUAGES.NO].sort());
	});

	test("keeps key and value-type parity between Norwegian and English", () => {
		const norwegian = translations[LANGUAGES.NO];
		const english = translations[LANGUAGES.EN];
		const norwegianKeys = Object.keys(norwegian).sort();
		const englishKeys = Object.keys(english).sort();
		expect(norwegianKeys).toEqual(englishKeys);

		for (const key of norwegianKeys) {
			const norwegianValue = norwegian[key];
			const englishValue = english[key];
			expect(englishValue === null).toBe(norwegianValue === null);
			if (norwegianValue !== null) {
				expect(typeof englishValue).toBe(typeof norwegianValue);
			}
		}
	});

	test("allows functions and explicit null, but no empty translation strings", () => {
		for (const language of [LANGUAGES.NO, LANGUAGES.EN]) {
			for (const value of Object.values(translations[language])) {
				if (typeof value === "string") {
					expect(value.trim().length).toBeGreaterThan(0);
					continue;
				}

				expect(value === null || typeof value === "function").toBe(true);
			}
		}
	});

	test("resolves every translation key referenced by navigation config", () => {
		const referencedKeys = new Set();
		collectTranslationKeys(NAV_ITEMS, referencedKeys);

		for (const key of referencedKeys) {
			expect(Object.hasOwn(translations[LANGUAGES.NO], key)).toBe(true);
			expect(Object.hasOwn(translations[LANGUAGES.EN], key)).toBe(true);
		}
	});

	test("does not retain local fallback-label channels", () => {
		const navigationSource = fs.readFileSync(path.resolve("src/navigation/navigation.js"), "utf8");
		const sidebarSource = fs.readFileSync(path.resolve("src/ui/view/components/Sidebar/SidebarNavigation.jsx"), "utf8");
		const authSource = fs.readFileSync(path.resolve("src/ui/view/components/AuthButton.jsx"), "utf8");
		expect(navigationSource).not.toContain("fallbackLabel");
		expect(sidebarSource).not.toContain("Eksamensnavigasjon");
		expect(authSource).not.toMatch(/Ikke innlogget|Clerk er ikke konfigurert|Logg inn|Innlogget|Hei,/);
	});
});
