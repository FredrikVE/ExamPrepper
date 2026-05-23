//src/model/domain/CalculateExamScoreUseCase.js
export default class CalculateExamScoreUseCase {
    constructor(gradeAnswerUseCase) {
        this.gradeAnswerUseCase = gradeAnswerUseCase;
    }

    execute(questions, answers) {
        const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
        const score = questions.reduce((sum, question) => {
            const isCorrect = this.gradeAnswerUseCase.execute(question, answers[question.id]);
            return sum + (isCorrect ? question.points : 0);
        }, 0);

        return {
            score,
            totalPoints,
            percentage: totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0
        };
    }
}
