// src/model/domain/exams/GetExamAttemptUseCase.js

/* Henter ett levert forsøk med svar og poeng per spørsmål, slik at
   eksamenssiden kan vise forsøket i lesemodus. */
export default class GetExamAttemptUseCase {
	constructor(examAttemptRepository) {
		this.examAttemptRepository = examAttemptRepository;
	}

	async execute(attemptId) {
		if (typeof attemptId !== "string" || attemptId.length === 0) {
			throw new Error("GetExamAttemptUseCase requires an attemptId");
		}

		const attempt = await this.examAttemptRepository.getAttemptById(attemptId);

		return mapExamAttempt(attempt);
	}
}

function mapExamAttempt(attempt) {
	if (!isPlainObject(attempt) || typeof attempt.id !== "string") {
		throw new Error("Invalid exam attempt");
	}

	if (!Array.isArray(attempt.results)) {
		throw new Error(`Exam attempt ${attempt.id} has no results`);
	}

	return {
		attemptId: attempt.id,
		examId: attempt.examId,
		scorePoints: toNumber(attempt.scorePoints),
		totalPoints: toNumber(attempt.totalPoints),
		percentage: attempt.percentage === null ? null : toNumber(attempt.percentage),
		submittedAt: attempt.submittedAt,
		results: attempt.results.map(mapQuestionResult)
	};
}

function mapQuestionResult(result) {
	if (!isPlainObject(result) || typeof result.questionKey !== "string") {
		throw new Error("Invalid exam attempt question result");
	}

	return {
		questionKey: result.questionKey,
		submittedAnswer: result.submittedAnswer ?? null,
		pointsAwarded: toNumber(result.pointsAwarded),
		maxPoints: toNumber(result.maxPoints),
		isCorrect: result.isCorrect === true
	};
}

/* NUMERIC-kolonner kan komme som tekst fra Postgres. */
function toNumber(value) {
	const number = typeof value === "number" ? value : Number(value);

	if (!Number.isFinite(number)) {
		throw new Error(`Invalid numeric value in exam attempt: ${String(value)}`);
	}

	return number;
}

function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
