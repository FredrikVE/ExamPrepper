//src/ui/viewmodel/LearningSession/createRewardModel.js
export default function createRewardModel({ pendingRewardKind, t, onDismiss }) {
	if (pendingRewardKind === null) {
		return null;
	}

	return { title: t.learningSessionRewardTitle, body: t.learningSessionRewardBody, dismissLabel: t.learningSessionRewardDismissLabel, onDismiss };
}
