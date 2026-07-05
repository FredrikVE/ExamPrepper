// src/ui/viewmodel/ExamPage/useExamQuestionLoadModel.js
import { useCallback, useRef } from "react";
import useLoadModel from "../LoadState/useLoadModel.js";
import shouldPreserveExamAttemptOnQuestionReload from "./shouldPreserveExamAttemptOnQuestionReload.js";

export default function useExamQuestionLoadModel({
	getExamQuestionsUseCase,
	examId,
	questionsLoadErrorMessage,
	onQuestionsLoaded
}) {
	const questionsRef = useRef([]);

	const executeQuestionLoad = useCallback(() => {
		return getExamQuestionsUseCase.execute({
			examId
		});
	}, [examId, getExamQuestionsUseCase]);

	const noteQuestionsLoaded = useCallback(({ loadedData }) => {
		const shouldPreserveAttempt = shouldPreserveExamAttemptOnQuestionReload(
			questionsRef.current,
			loadedData
		);

		questionsRef.current = loadedData;
		onQuestionsLoaded({
			loadedQuestions: loadedData,
			shouldPreserveAttempt
		});
	}, [onQuestionsLoaded]);

	const questionLoad = useLoadModel({
		execute: executeQuestionLoad,
		emptyData: [],
		errorFallbackMessage: questionsLoadErrorMessage,
		onLoaded: noteQuestionsLoaded
	});

	return {
		questions: questionLoad.data,
		questionsStatus: questionLoad.status,
		questionsError: questionLoad.error
	};
}
