// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx
import { ChevronDown } from "lucide-react";
import FormattedText from "../../Shared/FormattedText.jsx";
import ImportanceBars from "./ImportanceBars.jsx";

export default function GlossaryTableRow({ row }) {
	return (
		<tr className={row.className} onClick={row.onActivate} ref={row.ref}>
			<th scope="row">
				<span className="glossary-table-term"><FormattedText text={row.term} /></span>
				<span className="glossary-table-topic-area-reference">{row.topicAreaReference}</span>
			</th>
			<td className="glossary-table__explanation-cell">
				<FormattedText text={row.explanation} />
				<button
					type="button"
					className="glossary-table__detail-trigger"
					aria-haspopup="dialog"
					aria-label={row.detailTrigger.label}
					title={row.detailTrigger.label}
					onClick={row.detailTrigger.onActivate}
					ref={row.detailTrigger.ref}
				>
					<ChevronDown size={19} strokeWidth={2.25} aria-hidden="true" />
				</button>
			</td>
			<td className="glossary-table__importance-cell">
				<ImportanceBars model={row.importance} />
			</td>
		</tr>
	);
}
