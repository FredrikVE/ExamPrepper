// src/ui/view/components/StatisticsPage/Overview/StatisticsHistoryHeader.jsx
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT } from "../../../../../constants/StatisticsContracts.js";

export default function StatisticsHistoryHeader({ model, onChangeSort }) {
	return (
		<header className="statistics-history-header">
			<div className="statistics-history-heading">
				<h2 id="statistics-history-title">{model.title}</h2>
				<p>{model.subtitle}</p>
			</div>
			<div className="statistics-history-table-head">
				<SortButton label={model.dateLabel} sortKey={STATISTICS_HISTORY_SORT.DATE} activeSortKey={model.sortKey} sortDirection={model.sortDirection} onChangeSort={onChangeSort} />
				<SortButton label={model.nameLabel} sortKey={STATISTICS_HISTORY_SORT.NAME} activeSortKey={model.sortKey} sortDirection={model.sortDirection} onChangeSort={onChangeSort} />
				<SortButton label={model.statusLabel} sortKey={STATISTICS_HISTORY_SORT.STATUS} activeSortKey={model.sortKey} sortDirection={model.sortDirection} onChangeSort={onChangeSort} />
				<SortButton label={model.scoreLabel} sortKey={STATISTICS_HISTORY_SORT.SCORE} activeSortKey={model.sortKey} sortDirection={model.sortDirection} onChangeSort={onChangeSort} />
				<span className="statistics-history-head-label">{model.detailsLabel}</span>
			</div>
		</header>
	);
}

function SortButton({ label, sortKey, activeSortKey, sortDirection, onChangeSort }) {
	const isActive = activeSortKey === sortKey;
	let SortIcon = ChevronsUpDown;

	if (isActive && sortDirection === SORT_DIRECTION.ASC) {
		SortIcon = ChevronUp;
	}

	else if (isActive) {
		SortIcon = ChevronDown;
	}

	return (
		<button type="button" className="statistics-history-sort-button" aria-pressed={isActive} onClick={() => onChangeSort(sortKey)}>
			<span>{label}</span>
			<SortIcon aria-hidden="true" focusable="false" />
		</button>
	);
}
