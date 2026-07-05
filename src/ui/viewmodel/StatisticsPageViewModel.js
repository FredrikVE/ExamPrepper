// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useMemo } from "react";
import { LOAD_STATUS } from "../presentation/loadStatus.js";
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import createStatisticsDashboardModel from "./StatisticsPage/createStatisticsDashboardModel.js";
import useLoadModel from "./load/useLoadModel.js";
import combineLoadStatuses from "./load/combineLoadStatuses.js";

export default function useStatisticsPageViewModel({ getMyStatisticsUseCase, formatDate, t, authState, onStartNewExam }) {
	const isAuthLoaded = authState.isLoaded;
	const isSignedIn = authState.isSignedIn === true;
	const hasClerkAuth = authState.hasClerkAuth === true;

	const text = useMemo(() => createStatisticsTextModel(t), [t]);

	const executeStatisticsLoad = useCallback(() => {
		if (!isAuthLoaded || !isSignedIn) {
			return Promise.resolve(null);
		}

		return getMyStatisticsUseCase.execute();
	}, [getMyStatisticsUseCase, isAuthLoaded, isSignedIn]);

	const statisticsLoad = useLoadModel({
		execute: executeStatisticsLoad,
		emptyData: null,
		errorFallbackMessage: text.loadErrorMessage,
		onLoaded: noteStatisticsLoaded
	});

	const authStatus = resolveAuthLoadStatus(hasClerkAuth, isAuthLoaded);
	const pageStatus = combineLoadStatuses([
		authStatus,
		statisticsLoad.status
	]);
	const statistics = statisticsLoad.data;
	const pageErrorMessage = statisticsLoad.error ?? text.loadErrorMessage;

	const dashboard = useMemo(() => createStatisticsDashboardModel(
		statistics, formatDate, text
	), [statistics, formatDate, text]);

	const retryLoadStatistics = useCallback(() => {
		statisticsLoad.reload();
	}, [statisticsLoad.reload]);

	const startNewExam = useCallback(() => {
		onStartNewExam();
	}, [onStartNewExam]);

	return {
		// Auth state
		hasClerkAuth,
		isAuthLoaded,
		isSignedIn,
		isSignedOut: !hasClerkAuth || (isAuthLoaded && !isSignedIn),

		// Data state
		statistics,
		pageStatus,
		pageErrorMessage,

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

function noteStatisticsLoaded() {}

function resolveAuthLoadStatus(hasClerkAuth, isAuthLoaded) {
	if (hasClerkAuth && !isAuthLoaded) {
		return LOAD_STATUS.LOADING;
	}

	return LOAD_STATUS.READY;
}
