// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx
import HighlightedText from "../Shared/HighlightedText.jsx";

export default function GlossaryTableRow({ row }) {
	return (
		<tr>
			<th scope="row">
				<span className="glossary-table-term">
					<HighlightedText segments={row.termSegments} />
				</span>
				<span className="glossary-table-topic-area-reference">{row.topicAreaReference}</span>
			</th>
			<td>
				<HighlightedText segments={row.explanationSegments} />
			</td>
		</tr>
	);
}
