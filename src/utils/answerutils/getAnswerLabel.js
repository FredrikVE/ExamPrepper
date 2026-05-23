//src/utils/answer/getAnswerLabel.js
import AnswerLabelFormatter from "./AnswerLabelFormatter.js";

const answerLabelFormatter = new AnswerLabelFormatter();

export default function getAnswerLabel(question) {
	return answerLabelFormatter.format(question);
}