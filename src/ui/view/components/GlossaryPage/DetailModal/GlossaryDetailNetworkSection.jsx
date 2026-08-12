// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailNetworkSection.jsx
import { Network } from "lucide-react";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "../../../../viewmodel/GlossaryPage/glossaryNetworkModel.js";
import ConceptNetwork from "../ConceptNetwork/ConceptNetwork.jsx";

export default function GlossaryDetailNetworkSection({ model }) {
	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return (
			<section className="glossary-detail-modal__network glossary-detail-modal__network--status" role="status">
				<DetailNetworkHeading label={model.heading} />
				<p>{model.display.message}</p>
			</section>
		);
	}

	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return (
			<section className="glossary-detail-modal__network glossary-detail-modal__network--status" role="alert">
				<DetailNetworkHeading label={model.heading} />
				<p>{model.display.message}</p>
			</section>
		);
	}

	return (
		<section className="glossary-detail-modal__network">
			<ConceptNetwork
				model={model.display.model}
				title={model.heading}
				instructions={model.display.instructions}
				centerLabel={model.display.centerLabel}
				emptyLabel={model.display.emptyLabel}
				directAssociationLabel={model.display.directAssociationLabel}
				secondaryAssociationLabel={model.display.secondaryAssociationLabel}
			/>
			{model.display.limitNote !== null ? <p className="concept-network__limit-note">{model.display.limitNote}</p> : null}
		</section>
	);
}

function DetailNetworkHeading({ label }) {
	return (
		<h3 className="glossary-detail-modal__section-heading">
			<Network size={21} strokeWidth={1.9} aria-hidden="true" />
			<span>{label}</span>
		</h3>
	);
}
