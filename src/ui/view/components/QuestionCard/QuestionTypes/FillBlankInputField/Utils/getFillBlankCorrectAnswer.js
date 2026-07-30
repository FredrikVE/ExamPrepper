//src/ui/view/components/QuestionCard/QuestionTypes/FillBlankInputField/Utils/getFillBlankCorrectAnswer.js
export default function getFillBlankCorrectAnswer(question) {
    const domainAnswers = Array.isArray(question?.answers)
        ? question.answers
        : [];
    const acceptedAnswers = Array.isArray(question?.acceptedAnswers)
        ? question.acceptedAnswers
        : [];
    const candidates = [
        ...domainAnswers,
        ...acceptedAnswers,
        question?.answerKey
    ];

    const correctAnswer = candidates.find((candidate) => {
        return typeof candidate === "string" && candidate.trim().length > 0;
    });

    return correctAnswer?.trim() ?? "";
}
