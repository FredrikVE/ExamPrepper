// src/ui/viewmodel/StatisticsPage/statisticsViewToggle.js
export const STATISTICS_VIEW_IDS = Object.freeze({
	OVERVIEW: "overview",
	INSIGHTS: "insights"
});

export function createStatisticsViewToggleModel(text) {
	const entries = [
		{
			id: STATISTICS_VIEW_IDS.OVERVIEW,
			label: text.viewToggleOverviewLabel,
			isDisabled: false
		},
		{
			id: STATISTICS_VIEW_IDS.INSIGHTS,
			label: text.viewToggleInsightsLabel,
			isDisabled: true
		}
	];
	const mobileItems = [];

	for (const entry of entries) {
		mobileItems.push({
			id: entry.id,
			label: entry.label,
			contentTypeId: entry.id,
			isDisabled: entry.isDisabled,
			isActive: entry.id === STATISTICS_VIEW_IDS.OVERVIEW,
			entries: []
		});
	}

	return {
		entries,
		activeEntryId: STATISTICS_VIEW_IDS.OVERVIEW,
		mobileItems,
		mobileActiveEntryId: STATISTICS_VIEW_IDS.OVERVIEW,
		ariaLabel: text.viewToggleAriaLabel,
		mobileBackLabel: text.viewToggleBackLabel
	};
}

export function selectStatisticsView(viewId) {
	if (viewId === STATISTICS_VIEW_IDS.OVERVIEW) {
		return;
	}

	if (viewId === STATISTICS_VIEW_IDS.INSIGHTS) {
		throw new Error("Statistics insights view is locked");
	}

	throw new Error(`Unknown statistics view: ${String(viewId)}`);
}
