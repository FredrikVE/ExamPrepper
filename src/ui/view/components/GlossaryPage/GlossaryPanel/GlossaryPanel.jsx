// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryEntryCardList from "./GlossaryEntryCardList.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ heading, rows, tableHeaders, termColumnHeader, explanationColumnHeader, importanceColumnHeader, emptyState, isMobile }) {
	const glossaryContent = emptyState !== null ? (
		<section className="glossary-panel-empty" role="status">
			<h2>{emptyState.title}</h2>
			<p>{emptyState.body}</p>
		</section>
	) : isMobile ? (
		<GlossaryEntryCardList
			rows={rows}
			termLabel={termColumnHeader}
			explanationLabel={explanationColumnHeader}
			importanceLabel={importanceColumnHeader}
		/>
	) : (
		<GlossaryTable headers={tableHeaders} rows={rows} />
	);

	return (
		<article className="glossary-panel">
			{isMobile ? <GlossaryPanelHeading heading={heading} /> : null}
			<div className="glossary-panel__content">
				{glossaryContent}
			</div>
		</article>
	);
}
