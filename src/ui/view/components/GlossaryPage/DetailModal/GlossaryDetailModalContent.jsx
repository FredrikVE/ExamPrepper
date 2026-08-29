// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailModalContent.jsx
import GlossaryDetailGraph from "./GlossaryDetailGraph.jsx";
import GlossaryDetailRelations from "./GlossaryDetailRelations.jsx";

export default function GlossaryDetailModalContent({ model }) {
	return (
		<div className="glossary-detail-modal__content">
			<GlossaryDetailGraph
				model={model.network}
				isInteractive={model.isInteractive}
			/>

			<GlossaryDetailRelations
				model={model.relations}
				isInteractive={model.isInteractive}
			/>
		</div>
	);
}
