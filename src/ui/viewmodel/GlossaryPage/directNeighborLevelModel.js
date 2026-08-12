// src/ui/viewmodel/GlossaryPage/directNeighborLevelModel.js
export const DIRECT_NEIGHBOR_LEVELS = Object.freeze([1, 2, 3, 4]);
export const DIRECT_NEIGHBOR_MAX_LEVEL = DIRECT_NEIGHBOR_LEVELS.length;

const DIRECT_NEIGHBOR_THRESHOLDS = Object.freeze([
	{ maxCount: 0, level: 0 },
	{ maxCount: 1, level: 1 },
	{ maxCount: 3, level: 2 },
	{ maxCount: 5, level: 3 }
]);

export function createDirectNeighborLevelPresentation({ directNeighborCount, ariaLabel }) {
	return {
		value: directNeighborCount,
		level: resolveDirectNeighborLevel(directNeighborCount),
		ariaLabel
	};
}

export function resolveDirectNeighborLevel(directNeighborCount) {
	for (const threshold of DIRECT_NEIGHBOR_THRESHOLDS) {
		if (directNeighborCount <= threshold.maxCount) {
			return threshold.level;
		}
	}

	return DIRECT_NEIGHBOR_MAX_LEVEL;
}
