//src/ui/viewmodel/LearningSession/shouldShowSessionActionPanel.js
export default function shouldShowSessionActionPanel({ submitResult, isSessionComplete, submitStatus }) {
	if (submitResult !== null) {
		return false;
	}

	if (!isSessionComplete) {
		return true;
	}

	return submitStatus === "failed";
}
