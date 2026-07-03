import { useCallback, useEffect, useRef, useState } from "react";
import shouldPreserveExamAttemptOnQuestionReload from "./shouldPreserveExamAttemptOnQuestionReload.js";

export default function useExamQuestionLoadModel({
	getExamQuestionsUseCase,
	examId,
	questionsLoadErrorMessage,
	onQuestionsLoaded
}) {
	const [questions, setQuestions] = useState([]);
	const questionsRef = useRef([]);
	const [questionsLoading, setQuestionsLoading] = useState(true);
	const [questionsLoadError, setQuestionsLoadError] = useState(null);

	const loadQuestions = useCallback(() => {
		let cancelled = false;

		const run = async () => {
			try {
				setQuestionsLoading(true);
				setQuestionsLoadError(null);

				// examId is the question-load SSOT; language changes resolve to a translated examId.
				const loadedQuestions = await getExamQuestionsUseCase.execute({
					examId
				});

				if (!cancelled) {
					const shouldPreserveAttempt = shouldPreserveExamAttemptOnQuestionReload(
						questionsRef.current,
						loadedQuestions
					);

					questionsRef.current = loadedQuestions;
					setQuestions(loadedQuestions);
					onQuestionsLoaded({
						loadedQuestions,
						shouldPreserveAttempt
					});
				}
			}

			catch (questionsError) {
				if (!cancelled) {
					setQuestionsLoadError(questionsError?.message ?? questionsLoadErrorMessage);
				}
			}

			finally {
				if (!cancelled) {
					setQuestionsLoading(false);
				}
			}
		};

		run();

		return () => {
			cancelled = true;
		};
	}, [examId, getExamQuestionsUseCase, onQuestionsLoaded, questionsLoadErrorMessage]);

	useEffect(loadQuestions, [loadQuestions]);

	return {
		questions,
		questionsLoading,
		questionsLoadError,
		isInitialQuestionsLoad: questionsLoading && questions.length === 0
	};
}
