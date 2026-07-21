import HighlightedText from "../Shared/HighlightedText.jsx";

export default function GlossaryEntryCardList({ rows, termLabel, explanationLabel }) {
	return (
		<dl className="glossary-entry-card-list">
			{rows.map((row) => (
				<div key={row.glossaryEntryKey} className="glossary-entry-card">
					<div className="glossary-entry-card__section">
						<span className="glossary-entry-card__label">{termLabel}</span>
						<dt className="glossary-entry-card__term">
							<HighlightedText segments={row.termSegments} />
						</dt>
					</div>

					<div className="glossary-entry-card__section">
						<span className="glossary-entry-card__label">{explanationLabel}</span>
						<dd className="glossary-entry-card__explanation">
							<HighlightedText segments={row.explanationSegments} />
						</dd>
					</div>
				</div>
			))}
		</dl>
	);
}
