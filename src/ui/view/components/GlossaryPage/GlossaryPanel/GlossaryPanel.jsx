// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import WorkspaceMessage from "../../WorkspaceState/WorkspaceMessage.jsx";
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel(props) {
	return (
		<article className="glossary-panel">
			{props.heading ? <GlossaryPanelHeading heading={props.heading} /> : null}

			{props.emptyState ? (
				<WorkspaceMessage title={props.emptyState.title} body={props.emptyState.body} action={null} />
			) : (
				<GlossaryTable
					rows={props.tableRows}
					termColumnHeader={props.termColumnHeader}
					explanationColumnHeader={props.explanationColumnHeader}
				/>
			)}
		</article>
	);
}
