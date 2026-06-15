// src/ui/viewmodel/StatisticsPage/buildStatisticsKpiCards.js
import { roundPercentage } from "./statisticsNumbers.js";
import { createPercentageLabel } from "./statisticsValueLabels.js";

const SPARKLINE_MAX_POINTS = 12;

export function buildKpiCards(statistics, text) {
	const sparklineData = buildKpiSparklineData(statistics.scoreTrend);

	return [
		{
			id: "average-score",
			iconKey: "chart",
			tone: "blue",
			label: text.kpiAverageScore,
			value: createPercentageLabel(statistics.averageScorePercentage, text),
			description: text.createAttemptCountDescription(statistics.attemptCount),
			sparkline: sparklineData.averageScore
		},
		{
			id: "best-score",
			iconKey: "star",
			tone: "green",
			label: text.kpiBestScore,
			value: createPercentageLabel(statistics.bestScorePercentage, text),
			description: text.createAttemptCountDescription(statistics.attemptCount),
			sparkline: sparklineData.bestScore
		},
		{
			id: "correct-answers",
			iconKey: "check",
			tone: "purple",
			label: text.kpiCorrectAnswers,
			value: statistics.totalQuestions > 0 ? String(statistics.totalCorrectAnswers) : text.emptyValueLabel,
			description: text.createCorrectAnswersDescription(statistics.totalCorrectAnswers, statistics.totalQuestions),
			sparkline: sparklineData.correctAnswers
		},
		{
			id: "unique-exams",
			iconKey: "book",
			tone: "orange",
			label: text.kpiUniqueExams,
			value: statistics.uniqueExamCount > 0 ? String(statistics.uniqueExamCount) : text.emptyValueLabel,
			description: text.createUniqueExamsDescription(statistics.uniqueExamCount),
			sparkline: null
		}
	];
}

function buildKpiSparklineData(scoreTrend) {
	return {
		averageScore: buildRunningAverageSparkline(scoreTrend),
		bestScore: buildRunningMaxSparkline(scoreTrend),
		correctAnswers: buildScorePointsSparkline(scoreTrend)
	};
}

function buildRunningAverageSparkline(scoreTrend) {
	const points = [];
	let total = 0;
	let count = 0;

	for (const entry of scoreTrend) {
		if (entry.percentage === null) {
			continue;
		}

		total += entry.percentage;
		count += 1;
		points.push(roundPercentage(total / count));
	}

	return createSparkline("line", points);
}

function buildRunningMaxSparkline(scoreTrend) {
	const points = [];
	let best = null;

	for (const entry of scoreTrend) {
		if (entry.percentage === null) {
			continue;
		}

		best = best === null ? entry.percentage : Math.max(best, entry.percentage);
		points.push(best);
	}

	return createSparkline("line", points);
}

function buildScorePointsSparkline(scoreTrend) {
	const points = [];

	for (const entry of scoreTrend) {
		if (entry.scorePoints === null) {
			continue;
		}

		points.push(entry.scorePoints);
	}

	return createSparkline("bar", points);
}

function createSparkline(type, points) {
	const visiblePoints = points.slice(-SPARKLINE_MAX_POINTS);
	return visiblePoints.length >= 2 ? { type, points: visiblePoints } : null;
}
