// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTable.jsx
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import GlossaryTableRow from "./GlossaryTableRow.jsx";

const SORT_ICON_COMPONENT_BY_KIND = Object.freeze({
	ASCENDING: ArrowUp,
	DESCENDING: ArrowDown,
	UNSORTED: ArrowUpDown
});

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
	if (!header.isSortable) {
		return <th scope="col" className={header.className}>{header.label}</th>;
	}

	const SortIcon = SORT_ICON_COMPONENT_BY_KIND[header.sortIconKind];
	if (!SortIcon) {
		throw new Error(`Unknown glossary table sort icon kind: ${String(header.sortIconKind)}`);
	}

	return (
		<th scope="col" className={header.className} aria-sort={header.ariaSort}>
			<button
				type="button"
				className={header.buttonClassName}
				aria-label={header.actionLabel}
				title={header.actionLabel}
				onClick={header.onActivate}
			>
				<span>{header.label}</span>
				<SortIcon className="glossary-table__sort-icon" aria-hidden="true" />
			</button>
		</th>
	);
}
