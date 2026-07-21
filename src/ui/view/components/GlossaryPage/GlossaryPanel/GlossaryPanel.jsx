// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import WorkspaceMessage from "../../WorkspaceState/WorkspaceMessage.jsx";
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ heading, rows, termColumnHeader, explanationColumnHeader, emptyState }) {
	if (emptyState !== null) {
		return (
			<article className="glossary-panel">
				<WorkspaceMessage title={emptyState.title} body={emptyState.body} action={null} />
			</article>
		);
	}

	return (
		<article className="glossary-panel">
			<GlossaryPanelHeading heading={heading} />
			<GlossaryTable rows={rows} termColumnHeader={termColumnHeader} explanationColumnHeader={explanationColumnHeader} />
		</article>
	);
}
