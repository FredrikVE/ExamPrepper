// src/ui/view/components/StatisticsPage/Overview/StatisticsHistory.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProgressPager from "../../ProgressPager/ProgressPager.jsx";
import createProgressPagerEntries from "../../ProgressPager/createProgressPagerEntries.js";
import StatisticsHistoryHeader from "./StatisticsHistoryHeader.jsx";
import StatisticsHistoryRow from "./StatisticsHistoryRow.jsx";

const FIRST_HISTORY_PAGE_INDEX = 0;
const HISTORY_PAGE_INDEX_STEP = 1;
const NEUTRAL_ENTRY_CORRECTNESS = false;
const STATISTICS_HISTORY_LIST_ID = "statistics-history-list";

const resolveNeutralEntryCorrectness = () => NEUTRAL_ENTRY_CORRECTNESS;

export default function StatisticsHistory({ model, actions }) {
	const [expandedAttemptId, setExpandedAttemptId] = useState(null);
	const pagerEntries = createProgressPagerEntries({ count: model.pageCount, activeIndex: model.page, keyPrefix: "statistics-history-page", resolveIsCorrect: resolveNeutralEntryCorrectness });
	const showPager = model.expanded;

	const toggleAttempt = (attemptId) => {
		setExpandedAttemptId((currentAttemptId) => {
			if (currentAttemptId === attemptId) {
				return null;
			}

			return attemptId;
		});
	};

	const changeHistorySort = (sortKey) => {
		setExpandedAttemptId(null);
		actions.changeHistorySort(sortKey);
	};

	const toggleHistoryExpanded = () => {
		setExpandedAttemptId(null);
		actions.toggleHistoryExpanded();
	};

	const selectHistoryPage = (pageIndex) => {
		setExpandedAttemptId(null);
		actions.selectHistoryPage(pageIndex);
	};

	const goToPreviousHistoryPage = () => {
		setExpandedAttemptId(null);
		actions.goToPreviousHistoryPage();
	};

	const goToNextHistoryPage = () => {
		setExpandedAttemptId(null);
		actions.goToNextHistoryPage();
	};

	return (
		<section className="statistics-history" aria-labelledby="statistics-history-title">
			<StatisticsHistoryHeader model={model} onChangeSort={changeHistorySort} />
			<ol id={STATISTICS_HISTORY_LIST_ID} className="statistics-history-list">
				{model.items.map((item) => (
					<StatisticsHistoryRow key={item.attemptId} model={item} isExpanded={expandedAttemptId === item.attemptId} onToggle={toggleAttempt} />
				))}
			</ol>

			{showPager && (
				<ProgressPager
					className="statistics-history-pager"
					containerClassName="statistics-history-pager-container"
					ariaLabel={model.pagerLabel}
					previousLabel={model.previousPageLabel}
					previousDisabled={model.page === FIRST_HISTORY_PAGE_INDEX}
					previousButtonClassName="statistics-history-pager-button"
					onPrevious={goToPreviousHistoryPage}
					entries={pagerEntries}
					compactEntries={pagerEntries}
					minimalCompactEntries={pagerEntries}
					shouldUseCompactDots={false}
					shouldUseResponsiveCompactDots={true}
					showEntryOutcome={false}
					onSelectEntry={selectHistoryPage}
					dotsLabel={model.pagerLabel}
					goToEntryLabel={model.createGoToPageLabel}
					counterLabel={model.createPageCounterLabel(model.page, model.pageCount)}
					counterClassName="statistics-history-pager-counter"
					counterLabelClassName="statistics-history-pager-label"
					nextLabel={model.nextPageLabel}
					nextDisabled={model.page >= model.pageCount - HISTORY_PAGE_INDEX_STEP}
					nextButtonClassName="statistics-history-pager-button"
					onNext={goToNextHistoryPage}
					hasActionButton={false}
					actionButton={null}
				/>
			)}

			{model.showExpansionToggle && (
				<button type="button" className="statistics-history-toggle" aria-controls={STATISTICS_HISTORY_LIST_ID} aria-expanded={model.expanded} disabled={!model.canToggleExpanded} onClick={toggleHistoryExpanded}>
					<span>{model.toggleLabel}</span>
					<ChevronDown className="statistics-history-toggle-chevron" aria-hidden="true" focusable="false" />
				</button>
			)}
		</section>
	);
}
