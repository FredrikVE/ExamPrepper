// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx
import FormattedText from "../../Shared/FormattedText.jsx";
import MasteryEvidenceSummary from "../Mastery/MasteryEvidenceSummary.jsx";

export default function GlossaryTableRow({ row, openNetworkLabel, onOpenNetwork }) {
	return (
		<tr>
			<th scope="row">
				<span className="glossary-table-term"><FormattedText text={row.term} /></span>
				<span className="glossary-table-topic-area-reference">{row.topicAreaReference}</span>
			</th>
			<td><FormattedText text={row.explanation} /></td>
			<td className="glossary-table__connections-cell">
				<button
					type="button"
					className="glossary-network-open-button"
					onClick={() => onOpenNetwork(row.glossaryEntryKey)}
				>
					{openNetworkLabel}
				</button>
			</td>
			<td className="glossary-table__mastery-cell">
				<MasteryEvidenceSummary mastery={row.mastery} />
			</td>
		</tr>
	);
}
