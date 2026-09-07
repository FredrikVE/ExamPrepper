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

	test("keeps Development focused and centers the period controls", () => {
		const development = read("src/ui/view/components/StatisticsPage/Overview/StatisticsDevelopmentCard.jsx");
		const periodsCss = read("src/ui/style/StatisticsPage/periods.css");
		const responsiveCss = read("src/ui/style/StatisticsPage/responsive.css");

		expect(development).not.toContain("statistics-development-progress");
		expect(development).not.toContain("progressAttemptContextLabel");
		expect(periodsCss).toContain(".statistics-period-selector-controls {\n\tdisplay: flex;\n\tmin-width: 0;\n\talign-items: center;\n\tjustify-content: center;");
		expect(responsiveCss).toContain(".statistics-summary-cards {\n\t\tgrid-template-columns: repeat(2, minmax(0, 1fr));");
	});

	test("keeps the progress KPI directional and contextual", () => {
		const summary = read("src/ui/view/components/StatisticsPage/Overview/StatisticsSummaryCards.jsx");
		const overviewCss = read("src/ui/style/StatisticsPage/overview.css");

		expect(summary).toContain('import { ArrowDown, ArrowUp } from "lucide-react";');
		expect(summary).toContain("progressAttemptSummaryLabel");
		expect(overviewCss).toContain('.statistics-summary-card-progress[data-direction="up"] .statistics-summary-progress-icon');
		expect(overviewCss).toContain('.statistics-summary-card-progress[data-direction="down"] .statistics-summary-progress-icon');
	});

	test("keeps canonical pager and Lucide icon ownership", () => {
		const history = read("src/ui/view/components/StatisticsPage/Overview/StatisticsHistory.jsx");
		const statisticsViews = readDirectory("src/ui/view/components/StatisticsPage");

		expect(history).toContain("ProgressPager");
		expect(history).toContain("createProgressPagerEntries");
		expect(statisticsViews).toContain("lucide-react");
		expect(statisticsViews).not.toMatch(/<svg\b/);
	});

	test("keeps chapter cards fixed-width between carousel and expanded grid", () => {
		const chaptersCss = read("src/ui/style/StatisticsPage/chapters.css");

		expect(chaptersCss).toContain("--statistics-chapter-card-width: clamp(196px, 18vw, 216px)");
		expect(chaptersCss).toContain("overflow-x: auto");
		expect(chaptersCss).toContain("grid-template-columns: repeat(auto-fill, var(--statistics-chapter-card-width))");
		expect(chaptersCss).toContain("width: var(--statistics-chapter-card-width)");
		expect(chaptersCss).not.toContain("repeat(auto-fit, minmax(210px, 1fr))");
		expect(chaptersCss).not.toContain(".statistics-chapter-overview-expanded .statistics-chapter-card {\n\twidth: auto");
	});

	test("keeps the mobile chapter viewport full-width when the carousel has no overflow", () => {
		const responsiveCss = read("src/ui/style/StatisticsPage/responsive.css");

		expect(responsiveCss).toContain(".statistics-chapter-carousel:not(.statistics-chapter-carousel-static)");
		expect(responsiveCss).toContain(".statistics-chapter-carousel-static {\n\t\tgrid-template-columns: minmax(0, 1fr);");
		expect(responsiveCss).not.toContain("\n\t.statistics-chapter-carousel {\n\t\tgrid-template-columns: 34px minmax(0, 1fr) 34px;");
	});

	test("uses the LearningPath mastery vocabulary in chapter cards", () => {
		const dataSource = read("src/model/datasource/StatisticsDataSource.js");
		const chapterModel = read("src/ui/viewmodel/StatisticsPage/Overview/createStatisticsChapterModels.js");
		const chapterCard = read("src/ui/view/components/StatisticsPage/Overview/StatisticsChapterCard.jsx");

		expect(dataSource).toContain("chapter.masteryPercentage");
		expect(dataSource).not.toContain("chapter.scorePercentage");
		expect(dataSource).not.toContain("chapter.evidenceCount");
		expect(chapterModel).toContain("roundMasteryPercentage");
		expect(chapterCard).toContain("model.masteryPercentageLabel");
		expect(chapterCard).toContain("model.masteryLabel");
	});

	test("uses chapter cards as an explicit mastery-scope selector with the subject first", () => {
		const contracts = read("src/constants/StatisticsContracts.js");
		const overviewModel = read("src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js");
		const chapterModels = read("src/ui/viewmodel/StatisticsPage/Overview/createStatisticsChapterModels.js");
		const chapterOverview = read("src/ui/view/components/StatisticsPage/Overview/StatisticsChapterOverview.jsx");
		const chapterCard = read("src/ui/view/components/StatisticsPage/Overview/StatisticsChapterCard.jsx");

		expect(contracts).toContain('SUBJECT: "subject"');
		expect(contracts).toContain('TOPIC_AREA: "topic-area"');
		expect(chapterModels).toContain('const items = [createSubjectScopeModel');
		expect(chapterOverview).toContain('onSelectScope');
		expect(chapterCard).toContain('aria-pressed={model.isSelected}');
		expect(overviewModel).toContain('statistics.subjectMastery');
		expect(overviewModel).toContain('chapter.developmentPeriods');
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
