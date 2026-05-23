//src/model/domain/GradeAnswerUseCase.js
import { normalizeAnswer, getCorrectIndexes } from "../../utils/exam/answerUtils.js";

export default class GradeAnswerUseCase {
    execute(question, answer) {
        if (!question) return false;

        if (question.type === "single") {
            return question.options?.[answer]?.correct === true;
        }

        if (question.type === "multi") {
            const selected = Array.isArray(answer) ? [...answer].sort((a, b) => a - b) : [];
            const correct = getCorrectIndexes(question).sort((a, b) => a - b);

            return selected.length === correct.length &&
                selected.every((value, index) => value === correct[index]);
        }

        if (question.type === "fill") {
            const normalized = normalizeAnswer(answer);
            return question.answers.some((acceptedAnswer) =>
                normalizeAnswer(acceptedAnswer) === normalized
            );
        }

        return false;
    }
}
