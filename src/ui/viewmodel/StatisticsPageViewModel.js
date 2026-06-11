// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import createStatisticsDashboardModel from "./Utils/statisticsDashboardModel.js";

const LOAD_ERROR_MESSAGE = "Kunne ikke laste statistikken din.";
const isNeverCancelled = () => false;

export default function useStatisticsPageViewModel(getExamAttemptHistoryUseCase, language, t = {}, onStartNewExam = () => {}) {
	const [attempts, setAttempts] = useState([]);
	const [attemptsLoading, setAttemptsLoading] = useState(true);
	const [attemptsLoadError, setAttemptsLoadError] = useState(null);

	const loadAttempts = useCallback(async (isCancelled = isNeverCancelled) => {
		try {
			setAttemptsLoading(true);
			setAttemptsLoadError(null);

			const result = await getExamAttemptHistoryUseCase.execute();

			if (!isCancelled()) {
				setAttempts(result);
			}
		} catch (error) {
			console.error("Feil ved henting av statistikk:", error);

			if (!isCancelled()) {
				setAttempts([]);
				setAttemptsLoadError(error?.message ?? t.statisticsLoadErrorMessage ?? LOAD_ERROR_MESSAGE);
			}
		} finally {
			if (!isCancelled()) {
				setAttemptsLoading(false);
			}
		}
	}, [getExamAttemptHistoryUseCase, t]);

	useEffect(() => {
		let cancelled = false;

		loadAttempts(() => cancelled);

		return () => {
			cancelled = true;
		};
	}, [loadAttempts]);

	const dashboard = useMemo(() => {
		return createStatisticsDashboardModel(attempts, language, t);
	}, [attempts, language, t]);

	const retryLoadAttempts = useCallback(() => {
		loadAttempts();
	}, [loadAttempts]);

	const startNewExam = useCallback(() => {
		onStartNewExam();
	}, [onStartNewExam]);

	return {
		// Data state
		attempts,
		attemptsLoading,
		attemptsLoadError,

		// Dashboard model
		...dashboard,

		// Handlers
		onRetryLoadAttempts: retryLoadAttempts,
		onStartNewExam: startNewExam
	};
}
