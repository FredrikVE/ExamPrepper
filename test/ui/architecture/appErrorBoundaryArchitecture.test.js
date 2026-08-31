// test/ui/architecture/appErrorBoundaryArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const APP_PATH = path.resolve("src/App.jsx");
const FALLBACK_PATH = path.resolve("src/ui/view/components/AppErrorBoundary/AppErrorFallback.jsx");
const FALLBACK_STYLE_PATH = path.resolve("src/ui/style/AppErrorBoundary/index.css");
const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");

describe("root error boundary architecture", () => {
	test("keeps the fallback platform-free and the reload policy in the composition root", () => {
		const appSource = fs.readFileSync(APP_PATH, "utf8");
		const fallbackSource = fs.readFileSync(FALLBACK_PATH, "utf8");
		expect(fallbackSource).not.toMatch(/window|document|localStorage|location\.reload/);
		expect(fallbackSource).toContain("onClick={onRecover}");
		expect(appSource).toContain("window.location.reload()");
		expect(appSource).toContain("<AppErrorBoundary");
	});

	test("uses the canonical primary-button tokens for the recovery action", () => {
		const fallbackStyleSource = fs.readFileSync(FALLBACK_STYLE_PATH, "utf8");
		const tokensSource = fs.readFileSync(TOKENS_PATH, "utf8");
		expect(tokensSource).toContain("--button-primary-text:");
		expect(fallbackStyleSource).toContain("border: 1px solid var(--button-primary-border);");
		expect(fallbackStyleSource).toContain("background: var(--button-primary-bg);");
		expect(fallbackStyleSource).toContain("color: var(--button-primary-text);");
		expect(fallbackStyleSource).toContain("outline: 3px solid var(--button-focus-ring);");
		expect(fallbackStyleSource).not.toContain("--text-on-accent");
	});

	test("does not replace the page-load pipeline", () => {
		const appSource = fs.readFileSync(APP_PATH, "utf8");
		expect(appSource).toContain("<AppContent />");
		expect(appSource).not.toContain("LOAD_STATUS");
	});
});
