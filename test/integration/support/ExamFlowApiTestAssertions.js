// test/integration/support/ExamFlowApiTestAssertions.js
import { expect } from "@jest/globals";

export default class ExamFlowApiTestAssertions {
	getSubjectById(subjects, subjectId) {
		for (const subject of subjects) {
			if (subject.id === subjectId) {
				return subject;
			}
		}

		throw new Error(`Could not find subject with id: ${subjectId}`);
	}

	getQuestionByType(questions, questionType) {
		for (const question of questions) {
			if (question.type === questionType) {
				return question;
			}
		}

		throw new Error(`Could not find question with type: ${questionType}`);
	}

	getQuestionByTitle(questions, questionTitle) {
		for (const question of questions) {
			if (question.title === questionTitle) {
				return question;
			}
		}

		throw new Error(`Could not find question with title: ${questionTitle}`);
	}

	getOptionWithExtendedExplanation(options) {
		for (const option of options) {
			if (Array.isArray(option.whyExtended) && option.whyExtended.length > 0) {
				return option;
			}
		}

		throw new Error("Could not find option with extended explanation.");
	}

	expectExamIds(exams, expectedExamIds) {
		const actualExamIds = [];

		for (const exam of exams) {
			actualExamIds.push(exam.id);
		}

		expect(actualExamIds).toEqual(expectedExamIds);
	}

	expectEveryExamHasQuestions(exams) {
		for (const exam of exams) {
			expect(exam.questionCount).toBeGreaterThan(0);
		}
	}
}
