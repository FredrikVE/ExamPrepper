// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryEntryDetails.jsx
import { Link2, Network } from "lucide-react";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "../../../../viewmodel/GlossaryPage/glossaryNetworkModel.js";
import ConceptNetwork from "../ConceptNetwork/ConceptNetwork.jsx";

export default function GlossaryEntryDetails({ details }) {
	return (
		<div className="glossary-entry-details">
			<div className="glossary-entry-details__associations-heading">
				<Link2 size={17} strokeWidth={1.9} aria-hidden="true" />
				<span>{details.associationsHeading}</span>
			</div>

			<div className="glossary-entry-details__chips">
				{details.directNeighbors.length === 0 ? (
					<p className="glossary-entry-details__empty">{details.emptyAssociationsLabel}</p>
				) : details.directNeighbors.map((neighbor) => (
					<span className="glossary-entry-details__chip" key={neighbor.glossaryEntryKey}>
						{neighbor.term}
					</span>
				))}
			</div>

			<InlineNetwork network={details.network} />
		</div>
	);
}

function InlineNetwork({ network }) {
	if (network.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return (
			<section className="concept-network concept-network--inline-status" role="status">
				<div className="concept-network__inline-heading">
					<Network size={17} strokeWidth={1.9} aria-hidden="true" />
					<strong>{network.title}</strong>
				</div>
				<p>{network.message}</p>
			</section>
		);
	}

	if (network.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return (
			<section className="concept-network concept-network--inline-status" role="alert">
				<div className="concept-network__inline-heading">
					<Network size={17} strokeWidth={1.9} aria-hidden="true" />
					<strong>{network.title}</strong>
				</div>
				<p>{network.message}</p>
			</section>
		);
	}

	return (
		<div className="glossary-entry-details__network">
			<ConceptNetwork
				model={network.model}
				title={network.title}
				instructions={network.instructions}
				centerLabel={network.centerLabel}
				emptyLabel={network.emptyLabel}
				directAssociationLabel={network.directAssociationLabel}
				secondaryAssociationLabel={network.secondaryAssociationLabel}
			/>
			{network.limitNote !== null ? <p className="concept-network__limit-note">{network.limitNote}</p> : null}
		</div>
	);
}
