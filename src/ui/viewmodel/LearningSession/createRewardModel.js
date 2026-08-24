// src/ui/viewmodel/LearningSession/createRewardModel.js
import { LEARNING_SESSION_REWARD_KINDS } from "./LearningSessionStates.js";

export default function createRewardModel({ pendingRewardKind, combo, xp, t, onContinue }) {
	if (pendingRewardKind === null) {
		return null;
	}

	if (pendingRewardKind !== LEARNING_SESSION_REWARD_KINDS.COMBO) {
		throw new Error(`Unknown learning session reward kind: ${String(pendingRewardKind)}`);
	}

	return {
		title: t.learningSessionRewardTitle,
		body: t.learningSessionRewardBody,
		closeLabel: t.learningSessionRewardCloseLabel,
		statsLabel: t.learningSessionRewardStatsLabel,
		comboValue: String(combo),
		comboLabel: t.learningSessionRewardComboLabel,
		xpValue: `${xp} XP`,
		xpLabel: t.learningSessionRewardXpLabel,
		dismissLabel: t.learningSessionRewardDismissLabel,
		onContinue
	};
}
