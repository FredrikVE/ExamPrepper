// test/ui/viewmodel/LearningPath/createContinueLearningModel.test.js
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../../src/i18n/translations.js";
import createContinueLearningModel from "../../../../src/ui/viewmodel/LearningPath/createContinueLearningModel.js";

const t = { learningPathResumeTitle: "Resume", learningPathResumeBody: translations[LANGUAGES.EN].learningPathResumeBody, learningPathResumeLabel: "Resume path", learningPathContinueTitle: "Continue where you left off", learningPathContinueBody: (position, title) => `${position}:${title}:continue`, learningPathContinueNowLabel: "Continue now" };
const entry = (actionModel) => ({ position: 1, title: "Concepts", actionModel });

describe("createContinueLearningModel", () => {
	test("presents the active backend module as the stable continue surface", () => {
		const actionModel = { intent: "start", label: "Continue" };
		expect(createContinueLearningModel({ activeEntry: entry(actionModel), t })).toMatchObject({ title: "Continue where you left off", description: "1:Concepts:continue", buttonLabel: "Continue now", actionModel });
	});

	test("keeps the continue surface visible without reconstructing next activity", () => {
		const actionModel = { intent: "start", label: "Continue" };
		expect(createContinueLearningModel({ activeEntry: entry(actionModel), t })).toMatchObject({ isVisible: true, title: "Continue where you left off", description: "1:Concepts:continue", buttonLabel: "Continue now", actionModel });
	});

	test("does not claim an unpersisted question position when resuming", () => {
		const actionModel = { intent: "resume", label: "Resume" };
		const model = createContinueLearningModel({ activeEntry: entry(actionModel), t });

		expect(model).toMatchObject({
			isVisible: true,
			title: "Resume",
			description: "Continue Part 1: Concepts.",
			buttonLabel: "Continue now",
			actionModel
		});
	});
});
