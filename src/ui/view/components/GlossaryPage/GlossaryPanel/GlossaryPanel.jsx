// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import WorkspaceMessage from "../../WorkspaceState/WorkspaceMessage.jsx";
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ model }) {
	if (model.kind === "empty-state") {
		return (
			<article className="glossary-panel">
				<WorkspaceMessage title={model.emptyState.title} body={model.emptyState.body} action={null} />
			</article>
		);
	}

	return (
		<article className="glossary-panel">
			<GlossaryPanelHeading heading={model.heading} />
			<GlossaryTable
				rows={model.table.rows}
				termColumnHeader={model.table.termColumnHeader}
				explanationColumnHeader={model.table.explanationColumnHeader}
			/>
		</article>
	);
}
