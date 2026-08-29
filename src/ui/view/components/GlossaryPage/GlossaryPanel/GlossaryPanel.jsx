// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ heading, rows, tableHeaders, emptyState }) {
	let glossaryContent;

	if (emptyState !== null) {
		glossaryContent = (
			<section className="glossary-panel-empty" role="status">
				<h2>{emptyState.title}</h2>
				<p>{emptyState.body}</p>
			</section>
		);
	}

	else {
		glossaryContent = (
			<GlossaryTable headers={tableHeaders} rows={rows} />
		);
	}

	return (
		<article className="glossary-panel">
			<GlossaryPanelHeading heading={heading} />

			<div className="glossary-panel__content">
				{glossaryContent}
			</div>
		</article>
	);
}
