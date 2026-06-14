// src/ui/viewmodel/StatisticsPage/statisticsNumbers.js
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

export function normalizeNullablePercentagePoints(value) {
	const numericValue = normalizeNullableNumber(value);

	if (numericValue === null) {
		return null;
	}

	return roundPercentage(numericValue);
}

export function roundPercentage(value) {
	return Math.round(value * 10) / 10;
}

export function formatNumber(value) {
	if (Number.isInteger(value)) {
		return String(value);
	}

	return String(Number(value.toFixed(1)));
}
