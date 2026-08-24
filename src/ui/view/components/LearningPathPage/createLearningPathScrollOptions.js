// src/ui/view/components/LearningPathPage/createLearningPathScrollOptions.js
export default function createLearningPathScrollOptions({ behavior, prefersReducedMotion }) {
	let resolvedBehavior = behavior;

	if (prefersReducedMotion) {
		resolvedBehavior = "auto";
	}

	return {
		block: "nearest",
		inline: "nearest",
		behavior: resolvedBehavior
	};
}
