// src/ui/view/components/StatisticsPage/Overview/StatisticsHistory.jsx
import ProgressPager from "../../ProgressPager/ProgressPager.jsx";
import createProgressPagerEntries from "../../ProgressPager/createProgressPagerEntries.js";
import StatisticsHistoryHeader from "./StatisticsHistoryHeader.jsx";
import StatisticsHistoryRow from "./StatisticsHistoryRow.jsx";

const FIRST_HISTORY_PAGE_INDEX = 0;
const HISTORY_PAGE_INDEX_STEP = 1;
const MINIMUM_PAGED_HISTORY_PAGE_COUNT = 2;
const NEUTRAL_ENTRY_CORRECTNESS = false;

const resolveNeutralEntryCorrectness = () => NEUTRAL_ENTRY_CORRECTNESS;

export default function StatisticsHistory({ model, actions }) {
	const pagerEntries = createProgressPagerEntries({
		count: model.pageCount,
		activeIndex: model.page,
		keyPrefix: "statistics-history-page",
		resolveIsCorrect: resolveNeutralEntryCorrectness
	});
	const showPager = model.expanded && model.pageCount >= MINIMUM_PAGED_HISTORY_PAGE_COUNT;

	return (
		<section className="statistics-history" aria-labelledby="statistics-history-title">
			<StatisticsHistoryHeader model={model} onChangeSort={actions.changeHistorySort} />
			<ol className="statistics-history-list">
				{model.items.map((item) => <StatisticsHistoryRow key={item.attemptId} model={item} />)}
			</ol>

			{model.canToggleExpanded && (
				<button type="button" className="statistics-history-toggle" onClick={actions.toggleHistoryExpanded}>
					{model.toggleLabel}
				</button>
			)}

			{showPager && (
				<ProgressPager
					className="statistics-history-pager"
					containerClassName="statistics-history-pager-container"
					ariaLabel={model.pagerLabel}
					previousLabel={model.previousPageLabel}
					previousDisabled={model.page === FIRST_HISTORY_PAGE_INDEX}
					previousButtonClassName="statistics-history-pager-button"
					onPrevious={actions.goToPreviousHistoryPage}
					entries={pagerEntries}
					compactEntries={pagerEntries}
					minimalCompactEntries={pagerEntries}
					shouldUseCompactDots={false}
					shouldUseResponsiveCompactDots={true}
					showEntryOutcome={false}
					onSelectEntry={actions.setHistoryPage}
					dotsLabel={model.pagerLabel}
					goToEntryLabel={model.createGoToPageLabel}
					counterLabel={model.createPageCounterLabel(model.page, model.pageCount)}
					counterClassName="statistics-history-pager-counter"
					counterLabelClassName="statistics-history-pager-label"
					nextLabel={model.nextPageLabel}
					nextDisabled={model.page >= model.pageCount - HISTORY_PAGE_INDEX_STEP}
					nextButtonClassName="statistics-history-pager-button"
					onNext={actions.goToNextHistoryPage}
					hasActionButton={false}
					actionButton={null}
				/>
			)}
		</section>
	);
}
