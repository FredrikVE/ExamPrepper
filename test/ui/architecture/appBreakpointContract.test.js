import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";
import { APP_DESKTOP_MIN_WIDTH, APP_MOBILE_MAX_WIDTH, APP_MOBILE_QUERY } from "../../../src/ui/presentation/presentationMode.js";

const STYLE_DIRECTORY = path.resolve("src/ui/style");
const WIDTH_FEATURE_PATTERN = /\((min|max)-width:\s*(\d+)px\)/g;
const LOCAL_WIDTH_FEATURE_ALLOWLIST = {
	"max-width:380": "very narrow flipcard and toggle controls",
	"max-width:385": "matrix-placement minimum phone fit",
	"max-width:410": "matrix-placement compact phone fit",
	"max-width:420": "drag-and-drop compact phone fit",
	"max-width:430": "mobile sidebar control fit",
	"max-width:480": "small-phone component compaction",
	"max-width:520": "compact pager and menu layouts",
	"max-width:560": "learning-content card copy fit",
	"max-width:640": "compact typography and question controls",
	"max-width:680": "drag-and-drop single-column transition",
	"max-width:700": "question-card and pager compaction",
	"max-width:720": "progress and learning-content density",
	"max-width:760": "component-level grid transitions",
	"max-width:820": "component-level content fit",
	"max-width:860": "question-card content fit",
	"max-width:880": "category-sort intermediate fit",
	"max-width:900": "sequence-order intermediate fit",
	"max-width:920": "progress-pager intermediate fit",
	"max-width:1100": "large drag-and-drop and flipcard fit",
	"max-width:1138": "sequence-order geometry threshold",
	"max-width:1180": "wide component layout threshold",
	"max-width:1280": "desktop density adjustment",
	"max-width:1320": "glossary desktop density adjustment",
	"max-width:1385": "matrix-placement geometry threshold",
	"max-width:1400": "subject-grid desktop density adjustment",
	"max-width:1415": "sequence-order geometry threshold",
	"max-width:1600": "category-sort wide layout threshold",
	"max-width:1760": "exam workspace wide-layout ceiling",
	"min-width:681": "paired drag-and-drop desktop geometry",
	"min-width:701": "paired question-card desktop geometry",
	"min-width:981": "exam inner-workspace desktop geometry",
	"min-width:1440": "wide exam enhancements",
	"min-width:1760": "ultrawide exam enhancements"
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

function collectWidthFeatures() {
	const features = [];
	for (const filePath of collectCssFiles(STYLE_DIRECTORY)) {
		const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });
		root.walkAtRules("media", (rule) => {
			for (const match of rule.params.matchAll(WIDTH_FEATURE_PATTERN)) {
				features.push({
					filePath,
					operator: match[1],
					width: Number(match[2]),
					query: rule.params
				});
			}
		});
	}
	return features;
}

describe("app breakpoint contract", () => {
	test("exports the synchronized JavaScript boundary", () => {
		expect(APP_MOBILE_MAX_WIDTH).toBe(932);
		expect(APP_DESKTOP_MIN_WIDTH).toBe(933);
		expect(APP_MOBILE_QUERY).toBe("(max-width: 932px)");
		expect(APP_DESKTOP_MIN_WIDTH).toBe(APP_MOBILE_MAX_WIDTH + 1);
	});

	test("uses only the canonical values for app mobile and desktop boundaries", () => {
		for (const feature of collectWidthFeatures()) {
			if (feature.width === APP_MOBILE_MAX_WIDTH) {
				expect(feature.operator).toBe("max");
				continue;
			}

			if (feature.width === APP_DESKTOP_MIN_WIDTH) {
				expect(feature.operator).toBe("min");
			}
		}
	});

	test("keeps every component-local width threshold on an explicit allowlist", () => {
		for (const feature of collectWidthFeatures()) {
			if (feature.width === APP_MOBILE_MAX_WIDTH || feature.width === APP_DESKTOP_MIN_WIDTH) {
				continue;
			}

			const key = `${feature.operator}-width:${feature.width}`;
			expect(LOCAL_WIDTH_FEATURE_ALLOWLIST[key]).toEqual(expect.any(String));
			expect(LOCAL_WIDTH_FEATURE_ALLOWLIST[key].length).toBeGreaterThan(0);
		}
	});
});
