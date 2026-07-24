// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useMemo } from "react";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import createStatisticsDashboardModel from "./StatisticsPage/createStatisticsDashboardModel.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";

export default function useStatisticsPageViewModel({ getMyStatisticsUseCase, formatDate, t, authState, backContract, onStartNewExam }) {
	const isAuthLoaded = authState.isLoaded;
	const isSignedIn = authState.isSignedIn === true;
	const hasClerkAuth = authState.hasClerkAuth === true;
	const userId = authState.userId;

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
		errorMessage: text.loadErrorMessage,
		resourceKey: userId,
		isEnabled: isAuthLoaded && isSignedIn && userId !== null,
		onLoaded: null
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

	const workspaceState = createStatisticsWorkspaceState({
		pageStatus,
		isSignedOut: !hasClerkAuth || (isAuthLoaded && !isSignedIn),
		isStatisticsEmpty: dashboard.isStatisticsEmpty,
		text,
		pageErrorMessage,
		onRetryLoadStatistics: retryLoadStatistics,
		onStartNewExam: startNewExam
	});

	return {
		// Auth state
		hasClerkAuth,
		isAuthLoaded,
		isSignedIn,
		isSignedOut: !hasClerkAuth || (isAuthLoaded && !isSignedIn),

		// Data state
		statistics,
		workspaceState,
		backContract,

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

function createStatisticsWorkspaceState({
	pageStatus,
	isSignedOut,
	isStatisticsEmpty,
	text,
	pageErrorMessage,
	onRetryLoadStatistics,
	onStartNewExam
}) {
	const loadWorkspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: false,
		labels: {
			loading: text.loadingTitle,
			errorTitle: text.errorTitle,
			errorBody: pageErrorMessage,
			emptyTitle: "",
			emptyBody: ""
		},
		errorAction: {
			label: text.retryButton,
			onAction: onRetryLoadStatistics
		}
	});

	if (loadWorkspaceState.kind !== WORKSPACE_STATE_KINDS.CONTENT) {
		return loadWorkspaceState;
	}

	if (isSignedOut) {
		return {
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: text.signedOutTitle,
			body: text.signedOutBody,
			action: {
				label: text.startNewExamButton,
				onAction: onStartNewExam
			}
		};
	}

	if (isStatisticsEmpty) {
		return {
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: text.emptyTitle,
			body: text.emptyBody,
			action: {
				label: text.startNewExamButton,
				onAction: onStartNewExam
			}
		};
	}

	return {
		kind: WORKSPACE_STATE_KINDS.CONTENT
	};
}

function resolveAuthLoadStatus(hasClerkAuth, isAuthLoaded) {
	if (hasClerkAuth && !isAuthLoaded) {
		return LOAD_STATUS.LOADING;
	}

	return LOAD_STATUS.READY;
}
