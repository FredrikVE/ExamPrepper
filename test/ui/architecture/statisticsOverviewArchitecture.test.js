// test/ui/architecture/statisticsOverviewArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

function readDirectory(relativePath) {
	const absolutePath = path.resolve(relativePath);
	let source = "";

	for (const entry of fs.readdirSync(absolutePath, { withFileTypes: true })) {
		const childPath = path.join(absolutePath, entry.name);

		if (entry.isDirectory()) {
			source += readDirectory(path.relative(process.cwd(), childPath));
		}

		else {
			source += fs.readFileSync(childPath, "utf8");
		}
	}

	return source;
}

describe("Statistics Overview architecture", () => {
	test("keeps Statistics on the subject-scoped pipeline and removes the global legacy flow", () => {
		const dependencies = read("src/di/dependencies.js");
		const attemptDataSource = read("src/model/datasource/ExamAttemptDataSource.js");
		const attemptRepository = read("src/model/repositories/ExamAttemptRepository.js");

		expect(dependencies).toContain("getSubjectStatisticsUseCase");
		expect(dependencies).not.toContain("GetMyStatisticsUseCase");
		expect(attemptDataSource).not.toContain("fetchMyStatistics");
		expect(attemptRepository).not.toContain("getMyStatistics");
		expect(fs.existsSync(path.resolve("src/model/domain/statistics/GetMyStatisticsUseCase.js"))).toBe(false);
	});

	test("keeps Statistics Views below the ViewModel boundary", () => {
		const pageSource = read("src/ui/view/pages/StatisticsPage.jsx");
		const componentSource = readDirectory("src/ui/view/components/StatisticsPage");
		const viewSource = `${pageSource}\n${componentSource}`;

		expect(viewSource).not.toMatch(/from\s+["'][^"']*\/model\//);
		expect(viewSource).not.toMatch(/from\s+["'][^"']*\/di\//);
		expect(viewSource).not.toMatch(/from\s+["'][^"']*\/viewmodel\//);
	});

	test("keeps Statistics calculations out of memoization and the View layer", () => {
		const viewModelSource = readDirectory("src/ui/viewmodel/StatisticsPage");
		const componentSource = readDirectory("src/ui/view/components/StatisticsPage");

		expect(viewModelSource).not.toMatch(/\buseMemo\b/);
		expect(componentSource).not.toMatch(/\buseMemo\b/);
		expect(componentSource).not.toMatch(/Date\.now\s*\(/);
	});

	test("keeps canonical pager and Lucide icon ownership", () => {
		const history = read("src/ui/view/components/StatisticsPage/Overview/StatisticsHistory.jsx");
		const statisticsViews = readDirectory("src/ui/view/components/StatisticsPage");

		expect(history).toContain("ProgressPager");
		expect(history).toContain("createProgressPagerEntries");
		expect(statisticsViews).toContain("lucide-react");
		expect(statisticsViews).not.toMatch(/<svg\b/);
	});

	test("keeps Statistics theme and color ownership in Tokens.css", () => {
		const featureCss = readDirectory("src/ui/style/StatisticsPage");
		const tokens = read("src/ui/style/Tokens.css");

		expect(featureCss).not.toMatch(/\.dark\b/);
		expect(featureCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
		expect(featureCss).not.toMatch(/\brgba?\s*\(/);
		expect(featureCss).not.toMatch(/\bhsla?\s*\(/);
		expect(tokens).toContain("--statistics-chart-bar");
		expect(tokens).toContain("--statistics-chart-bar-latest");
		expect(tokens).toContain("--statistics-kpi-progress-label");
		expect(tokens).toContain("--statistics-kpi-completed-label");
		expect(tokens).toContain("--statistics-history-row-alternate");
		expect(tokens).toContain("--statistics-subject-backdrop-bg");
	});
});
