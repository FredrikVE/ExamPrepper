// src/constants/LearningPathRoadmapStatus.js
export const LEARNING_PATH_ROADMAP_STATUS = Object.freeze({
	COMPLETED: "completed",
	CURRENT: "current",
	AVAILABLE: "available",
	LOCKED: "locked"
});

export const LEARNING_PATH_ROADMAP_STATUSES = Object.freeze(
	Object.values(LEARNING_PATH_ROADMAP_STATUS)
);
