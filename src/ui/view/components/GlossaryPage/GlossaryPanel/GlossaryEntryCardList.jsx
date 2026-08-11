// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryEntryCardList.jsx
import FormattedText from "../../Shared/FormattedText.jsx";
import MasteryEvidenceSummary from "../Mastery/MasteryEvidenceSummary.jsx";

export default function GlossaryEntryCardList({ rows, termLabel, explanationLabel, connectionsLabel, masteryLabel, openNetworkLabel, onOpenNetwork }) {
	return (
		<dl className="glossary-entry-card-list">
			{rows.map((row) => (
				<div key={row.glossaryEntryKey} className="glossary-entry-card">
					<div className="glossary-entry-card__section">
						<span className="glossary-entry-card__label">{termLabel}</span>
						<dt className="glossary-entry-card__term"><FormattedText text={row.term} /></dt>
						<span className="glossary-entry-card__topic-area-reference">{row.topicAreaReference}</span>
					</div>

					<div className="glossary-entry-card__section">
						<span className="glossary-entry-card__label">{explanationLabel}</span>
						<dd className="glossary-entry-card__explanation"><FormattedText text={row.explanation} /></dd>
					</div>

					<div className="glossary-entry-card__section glossary-entry-card__section--tools">
						<div>
							<span className="glossary-entry-card__label">{connectionsLabel}</span>
							<button
								type="button"
								className="glossary-network-open-button"
								onClick={() => onOpenNetwork(row.glossaryEntryKey)}
							>
								{openNetworkLabel}
							</button>
						</div>
						<div>
							<span className="glossary-entry-card__label">{masteryLabel}</span>
							<MasteryEvidenceSummary mastery={row.mastery} />
						</div>
					</div>
				</div>
			))}
		</dl>
	);
}
