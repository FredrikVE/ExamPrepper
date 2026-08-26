// src/ui/viewmodel/LearningPath/createContinueLearningModel.js
import { LEARNING_PATH_ACTION_INTENT } from "./LearningPathActionIntent.js";

export default function createContinueLearningModel({ activeEntry, t }) {
	if (activeEntry === null || activeEntry.actionModel === null) {
		return {
			isVisible: false,
			title: "",
			description: "",
			buttonLabel: "",
			actionModel: null
		};
	}

	if (activeEntry.actionModel.intent === LEARNING_PATH_ACTION_INTENT.RESUME) {
		return {
			isVisible: true,
			title: t.learningPathResumeTitle,
			description: t.learningPathResumeBody(activeEntry.position, activeEntry.title),
			buttonLabel: t.learningPathContinueNowLabel,
			actionModel: activeEntry.actionModel
		};
	}

	if (activeEntry.actionModel.intent === LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST) {
		return {
			isVisible: true,
			title: t.learningPathChapterTestContinueTitle,
			description: t.learningPathChapterTestContinueBody(activeEntry.position, activeEntry.title),
			buttonLabel: t.learningPathContinueNowLabel,
			actionModel: activeEntry.actionModel
		};
	}

	if (activeEntry.actionModel.intent === LEARNING_PATH_ACTION_INTENT.START) {
		return {
			isVisible: true,
			title: t.learningPathContinueTitle,
			description: t.learningPathContinueBody(activeEntry.position, activeEntry.title),
			buttonLabel: t.learningPathContinueNowLabel,
			actionModel: activeEntry.actionModel
		};
	}

	throw new Error(`Unknown LearningPath action intent '${String(activeEntry.actionModel.intent)}'`);
}
