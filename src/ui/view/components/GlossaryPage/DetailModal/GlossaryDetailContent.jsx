// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailContent.jsx
import { Link2 } from "lucide-react";
import GlossaryDetailNetworkSection from "./GlossaryDetailNetworkSection.jsx";

export default function GlossaryDetailContent({ model, isInteractive }) {
	return (
		<div className="glossary-detail-content">
			<GlossaryDetailNetworkSection model={model.network} />

			<section className="glossary-detail__associations">
				<h3 className="glossary-detail__section-heading">
					<Link2 size={20} strokeWidth={1.9} aria-hidden="true" />
					<span>{model.associations.heading}</span>
				</h3>

				<AssociationList model={model.associations} isInteractive={isInteractive} />
			</section>
		</div>
	);
}

function AssociationList({ model, isInteractive }) {
	if (model.items.length === 0) {
		return <p className="glossary-detail__associations-empty">{model.emptyLabel}</p>;
	}

	return (
		<div className="glossary-detail__association-list">
			{model.items.map((item) => isInteractive ? (
				<button key={item.glossaryEntryKey} type="button" className="glossary-detail__association" onClick={item.onActivate}>
					{item.label}
				</button>
			) : (
				<span key={item.glossaryEntryKey} className="glossary-detail__association glossary-detail__association--static">
					{item.label}
				</span>
			))}
		</div>
	);
}
