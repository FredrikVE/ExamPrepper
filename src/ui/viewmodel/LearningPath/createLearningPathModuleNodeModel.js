// src/ui/viewmodel/LearningPath/createLearningPathModuleNodeModel.js
export default function createLearningPathModuleNodeModel({ module, status, t }) {
	const baseModel = {
		label: t.learningPathPartLabel(module.position),
		value: module.position,
		isCurrentStep: status.statusKey === "active"
	};

	if (status.statusKey === "active") {
		return {
			...baseModel,
			appearance: "active",
			iconKey: null
		};
	}

	if (status.statusKey === "completed") {
		const completedPresentation = createCompletedPresentation(module.progress.performanceBand);

		return {
			...baseModel,
			...completedPresentation
		};
	}

	return {
		...baseModel,
		appearance: status.appearance,
		iconKey: status.iconKey
	};
}

function createCompletedPresentation(performanceBand) {
	switch (performanceBand) {
		case "understood":
			return {
				appearance: "understood",
				iconKey: "check"
			};

		case "progress":
			return {
				appearance: "progress",
				iconKey: "trending"
			};

		case "practice":
			return {
				appearance: "practice",
				iconKey: "repeat"
			};

		case "not-assessed":
			return {
				appearance: "completed",
				iconKey: "check"
			};

		default:
			throw new Error(`Unknown LearningPath performance band '${performanceBand}'`);
	}
}
