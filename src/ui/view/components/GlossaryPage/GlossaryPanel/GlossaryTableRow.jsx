// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx
import HighlightedText from "../Shared/HighlightedText.jsx";

export default function GlossaryTableRow({ row }) {
	return (
		<tr>
			<th scope="row">
				<HighlightedText segments={row.termSegments} />
			</th>
			<td>
				<HighlightedText segments={row.explanationSegments} />
			</td>
		</tr>
	);
}
