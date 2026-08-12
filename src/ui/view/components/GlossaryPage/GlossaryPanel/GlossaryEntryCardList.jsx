// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryEntryCardList.jsx
import { ChevronDown } from "lucide-react";
import GlossaryDetailContent from "../DetailModal/GlossaryDetailContent.jsx";
import FormattedText from "../../Shared/FormattedText.jsx";

export default function GlossaryEntryCardList({ rows, termLabel, explanationLabel, directNeighborLabel, detailPresentation }) {
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
						<span className="glossary-entry-card__label">{directNeighborLabel}</span>
						<button type="button" className={row.mobileDisclosure.className} aria-expanded={row.mobileDisclosure.ariaExpanded} aria-controls={row.mobileDisclosure.controlsId} aria-label={row.mobileDisclosure.label} title={row.mobileDisclosure.label} onClick={row.mobileDisclosure.onActivate} onKeyDown={row.mobileDisclosure.onKeyDown} ref={row.mobileDisclosure.ref}>
							<span className="glossary-entry-card__direct-neighbor-count" aria-hidden="true">{row.mobileDisclosure.count}</span>
							<ChevronDown className="glossary-entry-card__direct-neighbor-chevron" size={20} strokeWidth={2} aria-hidden="true" />
						</button>
					</div>

					{row.isExpanded && detailPresentation !== null ? (
						<div className="glossary-entry-card__details" id={row.detailsId}>
							<GlossaryDetailContent model={detailPresentation} isInteractive={false} />
						</div>
					) : null}
				</div>
			))}
		</dl>
	);
}
