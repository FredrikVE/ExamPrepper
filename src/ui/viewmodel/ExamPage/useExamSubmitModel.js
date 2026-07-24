// src/ui/viewmodel/ExamPage/useExamSubmitModel.js
import { useCallback, useEffect, useState } from "react";
import transformAnswersForApi from "../Utils/transformAnswersForApi.js";

export default function useExamSubmitModel({
	attemptSaveErrorMessage,
	isSubmitted,
	submitExamAttemptUseCase,
	onExamSubmitted,
	onSubmitStarted
}) {
	const [savedAttempt, setSavedAttempt] = useState(null);
	const [attemptSaveError, setAttemptSaveError] = useState(null);
	const [attemptSaving, setAttemptSaving] = useState(false);
	const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);

	const resetSubmitModel = useCallback(() => {
		setSavedAttempt(null);
		setAttemptSaveError(null);
		setAttemptSaving(false);
		setIsSubmitConfirmOpen(false);
	}, []);

	const submitExamAttempt = useCallback(async ({
		answers,
		examId,
		language,
		questions,
		durationSeconds
	}) => {
		onExamSubmitted();
		setAttemptSaving(true);
		setAttemptSaveError(null);
		onSubmitStarted();

		try {
			const attempt = await submitExamAttemptUseCase.execute({
				examId,
				lang: language,
				durationSeconds,
				answers: transformAnswersForApi(questions, answers)
			});

			setSavedAttempt(attempt);
		} catch (submitError) {
			if (import.meta.env?.DEV === true) {
				console.error("[ExamSubmit] Submit failed", submitError);
			}

			setAttemptSaveError(attemptSaveErrorMessage);
		} finally {
			setAttemptSaving(false);
		}
	}, [attemptSaveErrorMessage, onExamSubmitted, onSubmitStarted, submitExamAttemptUseCase]);

	const openSubmitConfirmation = useCallback(() => {
		setIsSubmitConfirmOpen(true);
	}, []);

	const closeSubmitConfirmation = useCallback(() => {
		setIsSubmitConfirmOpen(false);
	}, []);

	const confirmSubmitExamAttempt = useCallback(async (submitAttemptInput) => {
		setIsSubmitConfirmOpen(false);
		await submitExamAttempt(submitAttemptInput);
	}, [submitExamAttempt]);

	useEffect(() => {
		if (isSubmitted) {
			setIsSubmitConfirmOpen(false);
		}
	}, [isSubmitted]);

	return {
		savedAttempt,
		attemptSaving,
		attemptSaveError,
		isSubmitConfirmOpen,
		resetSubmitModel,
		submitExamAttempt,
		openSubmitConfirmation,
		closeSubmitConfirmation,
		confirmSubmitExamAttempt
	};
}
