import FormattedText from "../../Shared/FormattedText.jsx";

export default function GlossaryEntryCardList({ rows, termLabel, explanationLabel }) {
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
				</div>
			))}
		</dl>
	);
}
