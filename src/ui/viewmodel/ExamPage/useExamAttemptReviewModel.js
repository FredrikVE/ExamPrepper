// src/ui/viewmodel/ExamPage/useExamAttemptReviewModel.js
import { useCallback } from "react";
import useLoadModel from "../LoadState/useLoadModel.js";
import { LOAD_STATUS } from "../LoadState/loadStatus.js";

/* Laster et levert forsøk når eksamenssiden åpnes i lesemodus.
   Uten attemptId er modellen avslått og alltid klar. */
export default function useExamAttemptReviewModel({ getExamAttemptUseCase, attemptId, attemptLoadErrorMessage }) {
	const isEnabled = attemptId !== null;

	const executeAttemptLoad = useCallback(() => {
		return getExamAttemptUseCase.execute(attemptId);
	}, [attemptId, getExamAttemptUseCase]);

	const attemptLoad = useLoadModel({
		execute: executeAttemptLoad,
		emptyData: null,
		errorMessage: attemptLoadErrorMessage,
		resourceKey: attemptId,
		isEnabled,
		onLoaded: null
	});

	if (!isEnabled) {
		return { attempt: null, attemptStatus: LOAD_STATUS.READY, attemptError: null };
	}

	return {
		attempt: attemptLoad.data,
		attemptStatus: attemptLoad.status,
		attemptError: attemptLoad.error
	};
}
