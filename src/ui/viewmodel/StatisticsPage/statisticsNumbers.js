// src/ui/viewmodel/StatisticsPage/statisticsNumbers.js
export function normalizeNumber(value) {
	const numericValue = normalizeNullableNumber(value);

	if (numericValue === null) {
		return 0;
	}

	return numericValue;
}

export function normalizeNullableNumber(value) {
	if (typeof value === "number") {
		if (Number.isFinite(value)) {
			return value;
		}

		return null;
	}

	if (typeof value === "string") {
		const trimmedValue = value.trim();

		if (trimmedValue === "") {
			return null;
		}

		const parsedValue = Number(trimmedValue);

		if (Number.isFinite(parsedValue)) {
			return parsedValue;
		}

		return null;
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

	const roundedValue = value.toFixed(1);
	const numberValue = Number(roundedValue);

	return String(numberValue);
}