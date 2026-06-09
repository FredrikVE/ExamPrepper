// test/integration/support/ExamFlowApiTestContext.js
import CorrectAnswerBuilder from "./CorrectAnswerBuilder.js";

export default class ExamFlowApiTestContext {
	calculateExamScoreUseCase = null;
	getAvailableExamsUseCase = null;
	getAvailableSubjectsUseCase = null;
	getExamByBaseIdAndLangUseCase = null;
	getExamQuestionsUseCase = null;
	getSubjectByIdUseCase = null;
	gradeAnswerUseCase = null;

	correctAnswerBuilder = new CorrectAnswerBuilder();

	#isLoaded = false;

	async load() {
		this.configureEnvironment();

		const dependencies = await import("../../../src/di/dependencies.js");

		this.calculateExamScoreUseCase = dependencies.calculateExamScoreUseCase;
		this.getAvailableExamsUseCase = dependencies.getAvailableExamsUseCase;
		this.getAvailableSubjectsUseCase = dependencies.getAvailableSubjectsUseCase;
		this.getExamByBaseIdAndLangUseCase = dependencies.getExamByBaseIdAndLangUseCase;
		this.getExamQuestionsUseCase = dependencies.getExamQuestionsUseCase;
		this.getSubjectByIdUseCase = dependencies.getSubjectByIdUseCase;
		this.gradeAnswerUseCase = dependencies.gradeAnswerUseCase;

		this.assertRequiredDependenciesWereLoaded();

		this.#isLoaded = true;
	}

	configureEnvironment() {
		process.env.VITE_API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000/api";
		process.env.VITE_IMAGE_BASE_URL = process.env.VITE_IMAGE_BASE_URL || "http://localhost:3000";
	}

	async loadSubjects(language) {
		this.assertLoaded();

		const result = await this.getAvailableSubjectsUseCase.execute({ language });

		return result.subjects;
	}

	async loadExams(subjectId, language) {
		this.assertLoaded();

		return this.getAvailableExamsUseCase.execute({
			subjectId,
			language
		});
	}

	async loadQuestions(examId) {
		this.assertLoaded();

		return this.getExamQuestionsUseCase.execute(examId);
	}

	async loadTranslatedExam(baseId, language) {
		this.assertLoaded();

		return this.getExamByBaseIdAndLangUseCase.execute({
			baseId,
			lang: language
		});
	}

	async loadSubject(subjectId, language) {
		this.assertLoaded();

		return this.getSubjectByIdUseCase.execute({
			subjectId,
			language
		});
	}

	calculateScore(questions, answersByQuestionId) {
		this.assertLoaded();

		return this.calculateExamScoreUseCase.execute(questions, answersByQuestionId);
	}

	gradeAnswer(question, answer) {
		this.assertLoaded();

		return this.gradeAnswerUseCase.execute(question, answer);
	}

	getQuestionScore(question, answer) {
		this.assertLoaded();

		return this.gradeAnswerUseCase.getQuestionScore(question, answer);
	}

	buildCorrectAnswersByQuestionId(questions) {
		const answersByQuestionId = {};

		for (const question of questions) {
			answersByQuestionId[question.id] = this.correctAnswerBuilder.build(question);
		}

		return answersByQuestionId;
	}

	buildCorrectAnswer(question) {
		return this.correctAnswerBuilder.build(question);
	}

	assertLoaded() {
		if (!this.#isLoaded) {
			throw new Error("ExamFlowApiTestContext must be loaded before use. Call load() in beforeAll().");
		}
	}

	assertRequiredDependenciesWereLoaded() {
		this.assertDependencyWasLoaded(this.calculateExamScoreUseCase, "calculateExamScoreUseCase");
		this.assertDependencyWasLoaded(this.getAvailableExamsUseCase, "getAvailableExamsUseCase");
		this.assertDependencyWasLoaded(this.getAvailableSubjectsUseCase, "getAvailableSubjectsUseCase");
		this.assertDependencyWasLoaded(this.getExamByBaseIdAndLangUseCase, "getExamByBaseIdAndLangUseCase");
		this.assertDependencyWasLoaded(this.getExamQuestionsUseCase, "getExamQuestionsUseCase");
		this.assertDependencyWasLoaded(this.getSubjectByIdUseCase, "getSubjectByIdUseCase");
		this.assertDependencyWasLoaded(this.gradeAnswerUseCase, "gradeAnswerUseCase");
	}

	assertDependencyWasLoaded(dependency, dependencyName) {
		if (!dependency) {
			throw new Error(`Missing dependency in API integration test context: ${dependencyName}`);
		}
	}
}
