// src/ui/view/components/QuestionCard/Shared/Feedback/FeedbackPanel/Utils/getAnswerLabel.js
import AnswerLabelFormatter from "./AnswerLabelFormatter.js";

const answerLabelFormatter = new AnswerLabelFormatter();

export default function getAnswerLabel(question) {
    return answerLabelFormatter.format(question);
}
