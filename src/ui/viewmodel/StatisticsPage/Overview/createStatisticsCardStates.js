// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsCardStates.js
import { createWorkspaceState } from "../../WorkspaceState/createWorkspaceState.js";

/* Alle tomhetsbeslutninger på kortnivå. View-komponentene tar ingen egne.

   Grafens periode-tomhet er ikke her: StatisticsScoreChart håndterer den som
   degenerert input og beholder aria-controls-målet for periodevelgeren.

   Error er strukturelt uåpnelig så lenge de fem kortene deler én useLoadModel:
   page-nivået kortslutter på LOAD_STATUS.ERROR og rendrer aldri children. */
export default function createStatisticsCardStates({ loadStatus, statistics, presentation, text }) {
	const hasStatistics = statistics !== null;

	return {
		development: createStatisticsCardState({
			loadStatus,
			isEmpty: !hasStatistics || !presentation.development.hasEvidence,
			emptyBody: text.developmentEmptyBody,
			text
		}),
		progress: createStatisticsCardState({
			loadStatus,
			isEmpty: !hasStatistics || !presentation.summary.hasProgress,
			emptyBody: text.progressEmptyBody,
			text
		}),
		completed: createStatisticsCardState({
			loadStatus,
			isEmpty: !hasStatistics || statistics.completedAttemptCount === 0,
			emptyBody: text.completedEmptyBody,
			text
		}),
		chapters: createStatisticsCardState({
			loadStatus,
			isEmpty: !hasStatistics || !presentation.chapters.hasEvidence,
			emptyBody: text.chaptersEmptyBody,
			text
		}),
		history: createStatisticsCardState({
			loadStatus,
			isEmpty: !hasStatistics || presentation.history.totalCount === 0,
			emptyBody: text.historyEmptyBody,
			text
		})
	};
}

function createStatisticsCardState({ loadStatus, isEmpty, emptyBody, text }) {
	return createWorkspaceState({
		loadStatus,
		isEmpty,
		labels: {
			loading: text.sectionLoadingLabel,
			errorTitle: text.errorTitle,
			errorBody: text.loadErrorMessage,
			emptyTitle: text.sectionEmptyTitle,
			emptyBody
		},
		errorAction: null
	});
}
