// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailNetworkSection.jsx
import { Network } from "lucide-react";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "../../../../viewmodel/GlossaryPage/glossaryNetworkModel.js";
import ConceptNetwork from "../ConceptNetwork/ConceptNetwork.jsx";

export default function GlossaryDetailNetworkSection({ model }) {
	return (
		<section className={resolveNetworkSectionClassName(model.display.kind)} role={resolveNetworkSectionRole(model.display.kind)}>
			<h3 className="glossary-detail__section-heading">
				<Network size={21} strokeWidth={1.9} aria-hidden="true" />
				<span>{model.heading}</span>
			</h3>
			<NetworkBody model={model} />
		</section>
	);
}

function NetworkBody({ model }) {
	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING || model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return <p>{model.display.message}</p>;
	}

	return (
		<>
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
		</>
	);
}

function resolveNetworkSectionClassName(kind) {
	return kind === GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT
		? "glossary-detail__network"
		: "glossary-detail__network glossary-detail__network--status";
}

function resolveNetworkSectionRole(kind) {
	if (kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return "status";
	}
	if (kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return "alert";
	}
	return null;
}
