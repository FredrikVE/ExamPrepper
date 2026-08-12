// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryEntryCardList.jsx
import { ChevronDown } from "lucide-react";
import FormattedText from "../../Shared/FormattedText.jsx";
import GlossaryEntryDetails from "./GlossaryEntryDetails.jsx";

export default function GlossaryEntryCardList({ rows, termLabel, explanationLabel, importanceLabel }) {
	return (
		<dl className="glossary-entry-card-list">
			{rows.map((row) => (
				<div key={row.glossaryEntryKey} className={row.mobileClassName} ref={row.ref}>
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
						<span className="glossary-entry-card__label">{importanceLabel}</span>
						<button
							type="button"
							className={row.mobileDisclosure.className}
							aria-expanded={row.mobileDisclosure.ariaExpanded}
							aria-controls={row.mobileDisclosure.controlsId}
							aria-label={row.mobileDisclosure.label}
							title={row.mobileDisclosure.label}
							onClick={row.mobileDisclosure.onActivate}
							onKeyDown={row.mobileDisclosure.onKeyDown}
							ref={row.mobileDisclosure.ref}
						>
							<span className="glossary-entry-card__importance-count" aria-hidden="true">{row.mobileDisclosure.count}</span>
							<ChevronDown className="glossary-entry-card__importance-chevron" size={20} strokeWidth={2} aria-hidden="true" />
						</button>
					</div>

					{row.details !== null ? (
						<div className="glossary-entry-card__details" id={row.details.id}>
							<GlossaryEntryDetails details={row.details} />
						</div>
					) : null}
				</div>
			))}
		</dl>
	);
}
