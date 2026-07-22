// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryEntryCardList from "./GlossaryEntryCardList.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ heading, rows, termColumnHeader, explanationColumnHeader, emptyState, isMobile }) {
	return (
		<article className="glossary-panel">
			<GlossaryPanelHeading heading={heading} />
			{emptyState !== null ? (
				<section className="glossary-panel-empty" role="status">
					<h2>{emptyState.title}</h2>
					<p>{emptyState.body}</p>
				</section>
			) : isMobile ? (
				<GlossaryEntryCardList rows={rows} termLabel={termColumnHeader} explanationLabel={explanationColumnHeader} />
			) : (
				<GlossaryTable rows={rows} termColumnHeader={termColumnHeader} explanationColumnHeader={explanationColumnHeader} />
			)}
		</article>
	);
}
