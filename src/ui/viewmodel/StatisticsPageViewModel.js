// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import createStatisticsDashboardModel from "./StatisticsPage/createStatisticsDashboardModel.js";

const isNeverCancelled = () => false;

export default function useStatisticsPageViewModel({ getMyStatisticsUseCase, formatDate, t, authState, onStartNewExam }) {
	const [statistics, setStatistics] = useState(null);
	const [statisticsLoading, setStatisticsLoading] = useState(false);
	const [statisticsLoadError, setStatisticsLoadError] = useState(null);

	const isAuthLoaded = authState.isLoaded;
	const isSignedIn = authState.isSignedIn === true;
	const hasClerkAuth = authState.hasClerkAuth === true;

	const text = useMemo(() => createStatisticsTextModel(t), [t]);

	const loadStatistics = useCallback(async (isCancelled = isNeverCancelled) => {
		if (!isAuthLoaded || !isSignedIn) {
			setStatistics(null);
			setStatisticsLoading(false);
			setStatisticsLoadError(null);
			return;
		}

		try {
			setStatisticsLoading(true);
			setStatisticsLoadError(null);

			const result = await getMyStatisticsUseCase.execute();

			if (!isCancelled()) {
				setStatistics(result);
			}
		} catch (error) {
			console.error("Feil ved henting av statistikk:", error);

			if (!isCancelled()) {
				setStatistics(null);
				setStatisticsLoadError(error?.message ?? text.loadErrorMessage);
			}
		} finally {
			if (!isCancelled()) {
				setStatisticsLoading(false);
			}
		}
	}, [text.loadErrorMessage, getMyStatisticsUseCase, isAuthLoaded, isSignedIn]);

	useEffect(() => {
		let cancelled = false;

		loadStatistics(() => cancelled);

		return () => {
			cancelled = true;
		};
	}, [loadStatistics]);

	const dashboard = useMemo(() => createStatisticsDashboardModel(
		statistics, formatDate, text
	), [statistics, formatDate, text]);

	const retryLoadStatistics = useCallback(() => {
		loadStatistics();
	}, [loadStatistics]);

	const startNewExam = useCallback(() => {
		onStartNewExam();
	}, [onStartNewExam]);

	const isInitialStatisticsLoading = isAuthLoaded && isSignedIn && statistics === null && !statisticsLoadError;
	const isStatisticsLoading = statisticsLoading || isInitialStatisticsLoading;

	return {
		// Auth state
		hasClerkAuth,
		isAuthLoaded,
		isSignedIn,
		isAuthLoading: hasClerkAuth && !isAuthLoaded,
		isSignedOut: !hasClerkAuth || (isAuthLoaded && !isSignedIn),

		// Data state
		statistics,
		statisticsLoading: isStatisticsLoading,
		statisticsLoadError,

		// Text
		pageTitle: text.pageTitle,
		pageSubtitle: text.pageSubtitle,
		loadingTitle: text.loadingTitle,
		loadingBody: text.loadingBody,
		signedOutTitle: text.signedOutTitle,
		signedOutBody: text.signedOutBody,
		emptyTitle: text.emptyTitle,
		emptyBody: text.emptyBody,
		errorTitle: text.errorTitle,
		retryButtonLabel: text.retryButton,
		startNewExamLabel: text.startNewExamButton,

		// Dashboard model
		...dashboard,

		// Handlers
		onRetryLoadStatistics: retryLoadStatistics,
		onStartNewExam: startNewExam
	};
}
