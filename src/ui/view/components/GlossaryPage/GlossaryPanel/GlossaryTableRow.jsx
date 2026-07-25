import FormattedText from "../../Shared/FormattedText.jsx";

export default function GlossaryTableRow({ row }) {
	return (
		<tr>
			<th scope="row">
				<span className="glossary-table-term"><FormattedText text={row.term} /></span>
				<span className="glossary-table-topic-area-reference">{row.topicAreaReference}</span>
			</th>
			<td><FormattedText text={row.explanation} /></td>
		</tr>
	);
}
