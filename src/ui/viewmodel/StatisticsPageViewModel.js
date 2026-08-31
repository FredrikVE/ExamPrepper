// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useMemo } from "react";
import { APP_AUTH_STATUS } from "../../auth/AppAuthState.js";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import createStatisticsDashboardModel from "./StatisticsPage/createStatisticsDashboardModel.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";

export default function useStatisticsPageViewModel(props) {
	const isAuthLoading = props.authState.status === APP_AUTH_STATUS.LOADING;
	const isSignedIn = props.authState.status === APP_AUTH_STATUS.SIGNED_IN;
	const isSignedOut = (
		props.authState.status === APP_AUTH_STATUS.DISABLED
		|| props.authState.status === APP_AUTH_STATUS.SIGNED_OUT
	);

	let userId = null;

	if (isSignedIn) {
		userId = props.authState.userId;
	}

	const text = useMemo(() => createStatisticsTextModel(props.t), [props.t]);

	const executeStatisticsLoad = useCallback(() => {
		if (!isSignedIn) {
			return Promise.resolve(null);
		}

		return props.getMyStatisticsUseCase.execute();
	}, [props.getMyStatisticsUseCase, isSignedIn]);

	const statisticsLoad = useLoadModel({
		execute: executeStatisticsLoad,
		emptyData: null,
		errorMessage: text.loadErrorMessage,
		resourceKey: userId,
		isEnabled: isSignedIn,
		onLoaded: null
	});

	const authStatus = resolveAuthLoadStatus(isAuthLoading);
	const pageStatus = combineLoadStatuses([
		authStatus,
		statisticsLoad.status
	]);
	const statistics = statisticsLoad.data;
	const pageErrorMessage = statisticsLoad.error ?? text.loadErrorMessage;

	const dashboard = useMemo(() => createStatisticsDashboardModel(
		statistics, props.formatDate, text
	), [statistics, props.formatDate, text]);

	const retryLoadStatistics = useCallback(() => {
		statisticsLoad.reload();
	}, [statisticsLoad.reload]);

	const startNewExam = useCallback(() => {
		props.onStartNewExam();
	}, [props.onStartNewExam]);

	const workspaceState = createStatisticsWorkspaceState({
		pageStatus,
		isSignedOut,
		isStatisticsEmpty: dashboard.isStatisticsEmpty,
		text,
		pageErrorMessage,
		onRetryLoadStatistics: retryLoadStatistics,
		onStartNewExam: startNewExam
	});

	return {
		statistics,
		workspaceState,
		backContract: props.backContract,

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

		...dashboard,

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

function resolveAuthLoadStatus(isAuthLoading) {
	if (isAuthLoading) {
		return LOAD_STATUS.LOADING;
	}

	return LOAD_STATUS.READY;
}
