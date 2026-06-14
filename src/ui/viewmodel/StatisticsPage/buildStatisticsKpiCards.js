// src/ui/viewmodel/StatisticsPage/buildStatisticsKpiCards.js
import { roundPercentage } from "./statisticsNumbers.js";
import { createPercentageLabel } from "./statisticsValueLabels.js";

const SPARKLINE_MAX_POINTS = 12;

export function buildKpiCards(statistics, copy) {
	const sparklineData = buildKpiSparklineData(statistics.scoreTrend);

	return [
		{
			id: "average-score",
			iconKey: "chart",
			tone: "blue",
			label: copy.kpiAverageScore,
			value: createPercentageLabel(statistics.averageScorePercentage, copy),
			description: copy.createAttemptCountDescription(statistics.attemptCount),
			sparkline: sparklineData.averageScore
		},
		{
			id: "best-score",
			iconKey: "star",
			tone: "green",
			label: copy.kpiBestScore,
			value: createPercentageLabel(statistics.bestScorePercentage, copy),
			description: copy.createAttemptCountDescription(statistics.attemptCount),
			sparkline: sparklineData.bestScore
		},
		{
			id: "correct-answers",
			iconKey: "check",
			tone: "purple",
			label: copy.kpiCorrectAnswers,
			value: statistics.totalQuestions > 0 ? String(statistics.totalCorrectAnswers) : copy.emptyValueLabel,
			description: copy.createCorrectAnswersDescription(statistics.totalCorrectAnswers, statistics.totalQuestions),
			sparkline: sparklineData.correctAnswers
		},
		{
			id: "unique-exams",
			iconKey: "book",
			tone: "orange",
			label: copy.kpiUniqueExams,
			value: statistics.uniqueExamCount > 0 ? String(statistics.uniqueExamCount) : copy.emptyValueLabel,
			description: copy.createUniqueExamsDescription(statistics.uniqueExamCount),
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
