// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTable.jsx
import GlossaryTableRow from "./GlossaryTableRow.jsx";

export default function GlossaryTable({ rows, termColumnHeader, explanationColumnHeader }) {
	return (
		<div className="glossary-table-scroll">
			<table className="glossary-table">
				<colgroup>
					<col className="glossary-table__term-column" />
					<col />
				</colgroup>
				<thead>
					<tr>
						<th scope="col">{termColumnHeader}</th>
						<th scope="col">{explanationColumnHeader}</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => <GlossaryTableRow key={row.glossaryEntryKey} row={row} />)}
				</tbody>
			</table>
		</div>
	);
}
