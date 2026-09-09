// src/ui/viewmodel/StatisticsPage/Overview/useStatisticsOverviewModel.js
import { useCallback, useState } from "react";
import { APP_AUTH_STATUS } from "../../../../auth/AppAuthState.js";
import { DEFAULT_STATISTICS_MASTERY_SCOPE, DEFAULT_STATISTICS_PERIOD, SORT_DIRECTION, STATISTICS_HISTORY_SORT } from "../../../../constants/StatisticsContracts.js";
import { LOAD_STATUS } from "../../LoadState/loadStatus.js";
import useLoadModel from "../../LoadState/useLoadModel.js";
import { WORKSPACE_STATE_KINDS } from "../../WorkspaceState/workspaceStateKinds.js";
import createStatisticsCardStates from "./createStatisticsCardStates.js";
import createStatisticsOverviewModel from "./createStatisticsOverviewModel.js";

const FIRST_HISTORY_PAGE_INDEX = 0;
const HISTORY_PAGE_INDEX_STEP = 1;

export default function useStatisticsOverviewModel(props) {
	const [period, setPeriod] = useState(DEFAULT_STATISTICS_PERIOD);
	const [masteryScopeState, setMasteryScopeState] = useState({ subjectId: props.subjectId, scope: DEFAULT_STATISTICS_MASTERY_SCOPE });
	const [historySortKey, setHistorySortKey] = useState(STATISTICS_HISTORY_SORT.DATE);
	const [historySortDirection, setHistorySortDirection] = useState(SORT_DIRECTION.DESC);
	const [historyExpanded, setHistoryExpanded] = useState(false);
	const [historyPage, setHistoryPage] = useState(FIRST_HISTORY_PAGE_INDEX);
	const isAuthLoading = props.authState.status === APP_AUTH_STATUS.LOADING;
	const isSignedIn = props.authState.status === APP_AUTH_STATUS.SIGNED_IN;
	const isSignedOut = props.authState.status === APP_AUTH_STATUS.DISABLED
		|| props.authState.status === APP_AUTH_STATUS.SIGNED_OUT;
	const isEnabled = isSignedIn && props.subjectId !== null && props.selectedSubject !== null;
	let resourceKey = null;

	if (isEnabled) {
		resourceKey = `${props.authState.userId}:${props.subjectId}`;
	}

	const executeLoad = useCallback(() => {
		if (!isEnabled) {
			return Promise.resolve(null);
		}

		return props.getSubjectStatisticsUseCase.execute({ subjectId: props.subjectId });
	}, [isEnabled, props.getSubjectStatisticsUseCase, props.subjectId]);

	const load = useLoadModel({ execute: executeLoad, emptyData: null, errorMessage: props.text.loadErrorMessage, resourceKey, isEnabled, onLoaded: null });
	let masteryScope = DEFAULT_STATISTICS_MASTERY_SCOPE;

	/* Scope-state er bare gyldig for faget den ble satt for. Avledning under render
	   hindrer at gammelt scope møter nytt fag før en effect rekker å kjøre. */
	if (masteryScopeState.subjectId === props.subjectId) {
		masteryScope = masteryScopeState.scope;
	}

	const presentation = createStatisticsOverviewModel({ statistics: load.data, period, masteryScope, historySortKey, historySortDirection, historyExpanded, historyPage, formatDate: props.formatDate, language: props.language, subject: props.selectedSubject, text: props.text });
	const cardStates = createStatisticsCardStates({ loadStatus: load.status, statistics: load.data, presentation, text: props.text });
	const workspaceState = createStatisticsPageState({ load, isAuthLoading, isSignedOut, text: props.text, onStartNewExam: props.onStartNewExam });

	const selectPeriod = useCallback((nextPeriod) => {
		setPeriod(nextPeriod);
	}, []);

	const selectMasteryScope = useCallback((nextScope) => {
		setMasteryScopeState({ subjectId: props.subjectId, scope: nextScope });
	}, [props.subjectId]);

	const changeHistorySort = useCallback((nextSortKey) => {
		setHistoryPage(FIRST_HISTORY_PAGE_INDEX);

		if (nextSortKey === historySortKey) {
			setHistorySortDirection((currentDirection) => {
				if (currentDirection === SORT_DIRECTION.ASC) {
					return SORT_DIRECTION.DESC;
				}

				return SORT_DIRECTION.ASC;
			});
			return;
		}

		setHistorySortKey(nextSortKey);
		setHistorySortDirection(SORT_DIRECTION.DESC);
	}, [historySortKey]);

	const toggleHistoryExpanded = useCallback(() => {
		setHistoryExpanded((value) => !value);
		setHistoryPage(FIRST_HISTORY_PAGE_INDEX);
	}, []);

	const selectHistoryPage = useCallback((pageIndex) => {
		setHistoryPage(pageIndex);
	}, []);

	const goToPreviousHistoryPage = useCallback(() => {
		setHistoryPage((value) => Math.max(FIRST_HISTORY_PAGE_INDEX, value - HISTORY_PAGE_INDEX_STEP));
	}, []);

	const goToNextHistoryPage = useCallback(() => {
		setHistoryPage((value) => Math.min(presentation.history.pageCount - HISTORY_PAGE_INDEX_STEP, value + HISTORY_PAGE_INDEX_STEP));
	}, [presentation.history.pageCount]);

	return {
		workspaceState,
		presentation,
		cardStates,
		actions: {
			selectPeriod,
			selectMasteryScope,
			changeHistorySort,
			toggleHistoryExpanded,
			selectHistoryPage,
			goToPreviousHistoryPage,
			goToNextHistoryPage
		}
	};
}

function createStatisticsPageState({ load, isAuthLoading, isSignedOut, text, onStartNewExam }) {
	if (isAuthLoading) {
		return {
			kind: WORKSPACE_STATE_KINDS.LOADING,
			label: text.loadingTitle
		};
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

	if (load.status === LOAD_STATUS.ERROR) {
		return {
			kind: WORKSPACE_STATE_KINDS.ERROR,
			title: text.errorTitle,
			body: load.error,
			action: {
				label: text.retryButton,
				onAction: load.reload
			}
		};
	}

	return {
		kind: WORKSPACE_STATE_KINDS.CONTENT
	};
}
