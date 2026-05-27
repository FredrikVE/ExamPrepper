// src/ui/view/components/ExamPage/FeedbackPanel/Utils/getAnswerLabel.js
import AnswerLabelFormatter from "./AnswerLabelFormatter.js";

const answerLabelFormatter = new AnswerLabelFormatter();

export default function getAnswerLabel(question) {
    return answerLabelFormatter.format(question);
}
