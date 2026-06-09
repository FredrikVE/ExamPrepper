// src/model/datasource/ApiExamQuestionDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiExamQuestionDataSource extends ApiDataSource {
	#subjectsPath = "/subjects";
	#examsPath = "/exams";
	#subjectExamsPathSuffix = "/exams";
	#questionsPathSuffix = "/questions";
	#practiceQuestionsQuery = "mode=practice";

	async fetchAllExams() {
		const subjects = await this.get(this.#subjectsPath);
		const exams = [];

		for (const subject of subjects) {
			const subjectExams = await this.get(this.#buildSubjectExamsPath(subject.id));

			for (const exam of subjectExams) {
				exams.push(exam);
			}
		}

		return exams;
	}

	async fetchExamById(examId) {
		const exam = await this.get(this.#buildExamPath(examId));
		const questions = await this.get(this.#buildExamQuestionsPath(examId));

		return {
			...exam,
			questions: this.#toDomainQuestions(questions)
		};
	}

	async fetchExamByBaseIdAndLang(baseId, language) {
		const exams = await this.fetchAllExams();

		for (const exam of exams) {
			if (exam.baseId === baseId && exam.lang === language) {
				return exam;
			}
		}

		return null;
	}

	#buildSubjectExamsPath(subjectId) {
		return `${this.#subjectsPath}/${encodeURIComponent(subjectId)}${this.#subjectExamsPathSuffix}`;
	}

	#buildExamPath(examId) {
		return `${this.#examsPath}/${encodeURIComponent(examId)}`;
	}

	#buildExamQuestionsPath(examId) {
		return `${this.#buildExamPath(examId)}${this.#questionsPathSuffix}?${this.#practiceQuestionsQuery}`;
	}

	#toDomainQuestions(questions) {
		const domainQuestions = [];

		for (const question of questions) {
			domainQuestions.push(this.#toDomainQuestion(question));
		}

		return domainQuestions;
	}

	#toDomainQuestion(question) {
		return {
			...question,
			answers: this.#getAnswers(question),
			whyExtended: this.#getArray(question.whyExtended),
			whyExtendedImageRefs: this.#getArray(question.whyExtendedImageRefs),
			whyExtendedImages: this.#getArray(question.whyExtendedImages),
			options: this.#toDomainOptions(question.options)
		};
	}

	#getAnswers(question) {
		if (question.answers) {
			return question.answers;
		}

		if (question.acceptedAnswers) {
			return question.acceptedAnswers;
		}

		return [];
	}

	#toDomainOptions(options) {
		if (!options) {
			return options;
		}

		const domainOptions = [];

		for (const option of options) {
			domainOptions.push(this.#toDomainOption(option));
		}

		return domainOptions;
	}

	#toDomainOption(option) {
		return {
			...option,
			correct: this.#getCorrectValue(option),
			why: this.#getWhy(option),
			whyExtended: this.#getArray(option.whyExtended),
			whyExtendedImageRefs: this.#getArray(option.whyExtendedImageRefs),
			whyExtendedImages: this.#getArray(option.whyExtendedImages)
		};
	}

	#getWhy(option) {
		if (option.why) {
			return option.why;
		}

		if (option.feedback) {
			return option.feedback;
		}

		return "";
	}

	#getArray(value) {
		if (Array.isArray(value)) {
			return value;
		}

		return [];
	}

	#getCorrectValue(option) {
		if (option.correct !== undefined) {
			return option.correct;
		}

		if (option.isCorrect !== undefined) {
			return option.isCorrect;
		}

		return false;
	}
}