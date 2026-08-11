// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTable.jsx
import GlossaryTableRow from "./GlossaryTableRow.jsx";

export default function GlossaryTable({ rows, termColumnHeader, explanationColumnHeader, connectionsColumnHeader, masteryColumnHeader, openNetworkLabel, onOpenNetwork }) {
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
						<th scope="col">{termColumnHeader}</th>
						<th scope="col">{explanationColumnHeader}</th>
						<th scope="col">{connectionsColumnHeader}</th>
						<th scope="col">{masteryColumnHeader}</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<GlossaryTableRow
							key={row.glossaryEntryKey}
							row={row}
							openNetworkLabel={openNetworkLabel}
							onOpenNetwork={onOpenNetwork}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
