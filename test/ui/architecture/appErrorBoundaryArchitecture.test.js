import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const APP_PATH = path.resolve("src/App.jsx");
const FALLBACK_PATH = path.resolve("src/ui/view/components/AppErrorBoundary/AppErrorFallback.jsx");

describe("root error boundary architecture", () => {
	test("keeps the fallback platform-free and the reload policy in the composition root", () => {
		const appSource = fs.readFileSync(APP_PATH, "utf8");
		const fallbackSource = fs.readFileSync(FALLBACK_PATH, "utf8");
		expect(fallbackSource).not.toMatch(/window|document|localStorage|location\.reload/);
		expect(fallbackSource).toContain("onClick={onRecover}");
		expect(appSource).toContain("window.location.reload()");
		expect(appSource).toContain("<AppErrorBoundary");
	});

	test("does not replace the page-load pipeline", () => {
		const appSource = fs.readFileSync(APP_PATH, "utf8");
		expect(appSource).toContain("<AppContent />");
		expect(appSource).not.toContain("LOAD_STATUS");
	});
});
