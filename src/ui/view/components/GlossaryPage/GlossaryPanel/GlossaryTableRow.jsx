// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx
import { ChevronDown } from "lucide-react";
import FormattedText from "../../Shared/FormattedText.jsx";

export default function GlossaryTableRow({ row }) {
	return (
		<tr className={row.className} onClick={row.onActivate} ref={row.ref}>
			<th scope="row">
				<span className="glossary-table-term"><FormattedText text={row.term} /></span>
				<span className="glossary-table-topic-area-reference">{row.topicAreaReference}</span>
			</th>
			<td className="glossary-table__explanation-cell">
				<FormattedText text={row.explanation} />
			</td>
			<td className="glossary-table__importance-cell">
				<button
					type="button"
					className={row.disclosure.className}
					aria-expanded={row.disclosure.ariaExpanded}
					aria-controls={row.disclosure.controlsId}
					aria-label={row.disclosure.label}
					title={row.disclosure.label}
					onClick={row.disclosure.onActivate}
					onKeyDown={row.disclosure.onKeyDown}
					ref={row.disclosure.ref}
				>
					<span className="glossary-table__importance-count" aria-hidden="true">{row.disclosure.count}</span>
					<ChevronDown className="glossary-table__importance-chevron" size={20} strokeWidth={2} aria-hidden="true" />
				</button>
			</td>
		</tr>
	);
}
