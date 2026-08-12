// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableDetails.jsx
import GlossaryEntryDetails from "./GlossaryEntryDetails.jsx";

export default function GlossaryTableDetails({ details }) {
	return (
		<tr className="glossary-table-details-row" id={details.id}>
			<td className="glossary-table-details-cell" colSpan={3}>
				<GlossaryEntryDetails details={details} />
			</td>
		</tr>
	);
}
