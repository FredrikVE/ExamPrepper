// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx
import { ChevronDown } from "lucide-react";
import FormattedText from "../../Shared/FormattedText.jsx";
import DirectNeighborMeter from "./DirectNeighborMeter.jsx";
import MasteryBadge from "../Mastery/MasteryBadge.jsx";
import { isInteractiveGlossaryTableRowTarget } from "./glossaryTableRowInteraction.js";

export default function GlossaryTableRow({ row }) {
	const activateRow = (event) => {
		if (isInteractiveGlossaryTableRowTarget(event.target)) {
			return;
		}

		row.onActivate();
	};

	return (
		<tr className="glossary-table-row" onClick={activateRow}>
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
					<ChevronDown className="glossary-table__detail-trigger-icon" aria-hidden="true" />
				</button>
			</td>
			<td className="glossary-table__connections-cell">
				<DirectNeighborMeter model={row.directNeighborLevel} />
			</td>
			<td className="glossary-table__mastery-cell">
				<MasteryBadge mastery={row.mastery} />
			</td>
		</tr>
	);
}
