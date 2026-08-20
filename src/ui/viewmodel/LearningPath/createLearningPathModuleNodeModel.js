// src/ui/viewmodel/LearningPath/createLearningPathModuleNodeModel.js
const COMPLETED_PRESENTATION_BY_BAND = Object.freeze({
	understood: Object.freeze({ appearance: "understood", iconKey: "check" }),
	progress: Object.freeze({ appearance: "progress", iconKey: "trending" }),
	practice: Object.freeze({ appearance: "practice", iconKey: "repeat" }),
	"not-assessed": Object.freeze({ appearance: "completed", iconKey: "check" })
});

export default function createLearningPathModuleNodeModel({ module, status, t }) {
	const baseModel = {
		label: t.learningPathPartLabel(module.position),
		value: module.position,
		isCurrentStep: status.statusKey === "active"
	};

	if (status.statusKey === "active") {
		return { ...baseModel, appearance: "active", iconKey: null };
	}

	if (status.statusKey === "completed") {
		return { ...baseModel, ...COMPLETED_PRESENTATION_BY_BAND[module.progress.performanceBand] };
	}

	return { ...baseModel, appearance: status.appearance, iconKey: status.iconKey };
}
