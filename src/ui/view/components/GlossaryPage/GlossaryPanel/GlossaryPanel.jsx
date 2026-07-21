// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import WorkspaceMessage from "../../WorkspaceState/WorkspaceMessage.jsx";
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryEntryCardList from "./GlossaryEntryCardList.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ heading, rows, termColumnHeader, explanationColumnHeader, emptyState, isMobile }) {
	return (
		<article className="glossary-panel">
			<GlossaryPanelHeading heading={heading} />
			{emptyState !== null ? (
				<WorkspaceMessage title={emptyState.title} body={emptyState.body} action={null} />
			) : isMobile ? (
				<GlossaryEntryCardList rows={rows} termLabel={termColumnHeader} explanationLabel={explanationColumnHeader} />
			) : (
				<GlossaryTable rows={rows} termColumnHeader={termColumnHeader} explanationColumnHeader={explanationColumnHeader} />
			)}
		</article>
	);
}
