//src/ui/viewmodel/LearningSession/createNextRoundStartCommand.js
export default function createNextRoundStartCommand({ subjectId, moduleId, language, currentRound, nextRound }) {
	if (typeof subjectId !== "string" || subjectId.length === 0) return null;
	if (typeof moduleId !== "string" || moduleId.length === 0) return null;
	if (typeof language !== "string" || language.length === 0) return null;
	if (!Number.isInteger(currentRound) || !Number.isInteger(nextRound)) return null;
	if (nextRound !== currentRound + 1 || nextRound > 3) return null;

	return { subjectId, moduleId, language, round: nextRound };
}
