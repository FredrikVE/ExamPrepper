// src/ui/viewmodel/StatisticsPage/statisticsFormatters.js
export const EMPTY_LABEL = "—";

export function normalizeNumber(value) {
	const numericValue = normalizeNullableNumber(value);
	return numericValue ?? 0;
}

export function normalizeNullableNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === "string" && value.trim() !== "") {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : null;
	}

	return null;
}

export function normalizeNullablePercentage(value) {
	const numericValue = normalizeNullableNumber(value);
	return numericValue === null ? null : roundPercentage(numericValue);
}

export function roundPercentage(value) {
	return Math.round(value * 10) / 10;
}

export function formatPercentageLabel(value) {
	if (value === null) {
		return EMPTY_LABEL;
	}

	return `${formatNumber(value)} %`;
}

export function formatNumber(value) {
	if (Number.isInteger(value)) {
		return String(value);
	}

	return String(Number(value.toFixed(1)));
}

export function createPointsLabel(scorePoints, totalPoints, copy) {
	return copy.createAttemptPointsLabel(
		formatNumber(normalizeNumber(scorePoints)),
		formatNumber(normalizeNumber(totalPoints))
	);
}
