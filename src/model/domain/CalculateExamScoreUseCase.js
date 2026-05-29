// src/model/domain/CalculateExamScoreUseCase.js
export default class CalculateExamScoreUseCase {
    constructor(gradeAnswerUseCase) {
        this.gradeAnswerUseCase = gradeAnswerUseCase;
    }

    execute(questions, answers) {
        const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
        const score = questions.reduce((sum, question) => {
            const answer = answers[question.id];
            const questionScore = typeof this.gradeAnswerUseCase.getQuestionScore === "function"
                ? this.gradeAnswerUseCase.getQuestionScore(question, answer)
                : (this.gradeAnswerUseCase.execute(question, answer) ? question.points : 0);

            return sum + questionScore;
        }, 0);

        const roundedScore = Number(score.toFixed(2));

        return {
            score: roundedScore,
            totalPoints,
            percentage: totalPoints > 0 ? Math.round((roundedScore / totalPoints) * 100) : 0
        };
    }
}
