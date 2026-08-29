// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTable.jsx
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { GLOSSARY_TABLE_SORT_DIRECTIONS, GLOSSARY_TABLE_SORT_KEYS } from "../../../../../constants/GlossaryTableSort.js";
import GlossaryTableRow from "./GlossaryTableRow.jsx";

const GLOSSARY_TABLE_ARIA_SORT = Object.freeze({ NONE: "none", ASCENDING: "ascending", DESCENDING: "descending" });

export default function GlossaryTable({ headers, rows }) {
	return (
		<div className="glossary-table-scroll">
			<table className="glossary-table">
				<colgroup>
					<col className="glossary-table__term-column" />
					<col className="glossary-table__explanation-column" />
					<col className="glossary-table__connections-column" />
					<col className="glossary-table__mastery-column" />
				</colgroup>
				<thead>
					<tr>
						{headers.map((header) => (
							<GlossaryTableHeader key={header.key} header={header} />
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<GlossaryTableRow key={row.glossaryEntryKey} row={row} />
					))}
				</tbody>
			</table>
		</div>
	);
}

function GlossaryTableHeader({ header }) {
	const SortIcon = resolveGlossaryTableSortIcon(header);
	const headerClassName = createGlossaryTableHeaderClassName(header.key);
	const buttonClassName = createGlossaryTableSortButtonClassName(header.isActive);
	const ariaSort = resolveGlossaryTableAriaSort(header);

	return (
		<th scope="col" className={headerClassName} aria-sort={ariaSort}>
			<button type="button" className={buttonClassName} aria-label={header.actionLabel} title={header.actionLabel} onClick={header.onActivate}>
				<span>{header.label}</span>
				<SortIcon className="glossary-table__sort-icon" aria-hidden="true" />
			</button>
		</th>
	);
}

function resolveGlossaryTableSortIcon(header) {
	if (!header.isActive) {
		return ArrowUpDown;
	}

	if (header.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING) {
		return ArrowUp;
	}

	if (header.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
		return ArrowDown;
	}

	throw new Error(`Unknown active glossary table sort direction: ${String(header.direction)}`);
}

function resolveGlossaryTableAriaSort(header) {
	if (!header.isActive) {
		return GLOSSARY_TABLE_ARIA_SORT.NONE;
	}

	if (header.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING) {
		return GLOSSARY_TABLE_ARIA_SORT.ASCENDING;
	}

	if (header.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
		return GLOSSARY_TABLE_ARIA_SORT.DESCENDING;
	}

	throw new Error(`Unknown active glossary table sort direction: ${String(header.direction)}`);
}

function createGlossaryTableHeaderClassName(sortKey) {
	let className = "glossary-table__sortable-header";

	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT) {
		className += " glossary-table__connections-header";
	}

	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.MASTERY) {
		className += " glossary-table__mastery-header";
	}

	return className;
}

function createGlossaryTableSortButtonClassName(isActive) {
	if (isActive) {
		return "glossary-table__sort-button glossary-table__sort-button--active";
	}

	return "glossary-table__sort-button";
}
