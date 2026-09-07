// src/ui/view/components/StatisticsPage/Overview/StatisticsHistoryHeader.jsx
import { STATISTICS_HISTORY_SORT } from "../../../../constants/StatisticsContracts.js";

export default function StatisticsHistoryHeader({ model, onChangeSort }) {
	return (
		<header className="statistics-history-header">
			<div>
				<h2 id="statistics-history-title">{model.title}</h2>
				<p>{model.subtitle}</p>
			</div>
			<div className="statistics-history-sort" aria-label={model.title}>
				<SortButton label={model.dateLabel} sortKey={STATISTICS_HISTORY_SORT.DATE} activeSortKey={model.sortKey} onChangeSort={onChangeSort} />
				<SortButton label={model.nameLabel} sortKey={STATISTICS_HISTORY_SORT.NAME} activeSortKey={model.sortKey} onChangeSort={onChangeSort} />
				<SortButton label={model.scoreLabel} sortKey={STATISTICS_HISTORY_SORT.SCORE} activeSortKey={model.sortKey} onChangeSort={onChangeSort} />
			</div>
		</header>
	);
}

function SortButton({ label, sortKey, activeSortKey, onChangeSort }) {
	return (
		<button type="button" className="statistics-history-sort-button" aria-pressed={activeSortKey === sortKey} onClick={() => onChangeSort(sortKey)}>
			{label}
		</button>
	);
}
