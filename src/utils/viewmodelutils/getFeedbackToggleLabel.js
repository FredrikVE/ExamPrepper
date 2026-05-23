//src/utils/viewmodelutils/getFeedbackToggleLabel.js
export default function getFeedbackToggleLabel(showAllFeedback) {
	if (showAllFeedback) {
		return "Skjul fasit";
	}

	return "Vis fasit";
}