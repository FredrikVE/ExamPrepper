// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx
import ConceptNetwork from "../ConceptNetwork/ConceptNetwork.jsx";
import GlossaryPanelHeading from "./GlossaryPanelHeading.jsx";
import GlossaryEntryCardList from "./GlossaryEntryCardList.jsx";
import GlossaryTable from "./GlossaryTable.jsx";

export default function GlossaryPanel({ heading, rows, termColumnHeader, explanationColumnHeader, connectionsColumnHeader, masteryColumnHeader, openNetworkLabel, emptyState, isMobile, network, isNetworkLoading, networkError, networkTitle, networkInstructions, networkCloseLabel, onOpenNetwork, onCloseNetwork }) {
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
			connectionsLabel={connectionsColumnHeader}
			masteryLabel={masteryColumnHeader}
			openNetworkLabel={openNetworkLabel}
			onOpenNetwork={onOpenNetwork}
		/>
	) : (
		<GlossaryTable
			rows={rows}
			termColumnHeader={termColumnHeader}
			explanationColumnHeader={explanationColumnHeader}
			connectionsColumnHeader={connectionsColumnHeader}
			masteryColumnHeader={masteryColumnHeader}
			openNetworkLabel={openNetworkLabel}
			onOpenNetwork={onOpenNetwork}
		/>
	);

	return (
		<article className="glossary-panel">
			{isMobile ? <GlossaryPanelHeading heading={heading} /> : null}
			<div className={network !== null || isNetworkLoading || networkError !== null ? "glossary-panel__content glossary-panel__content--network-open" : "glossary-panel__content"}>
				{glossaryContent}
				{isNetworkLoading ? (
					<section className="concept-network concept-network--status" role="status">{networkTitle}</section>
				) : networkError !== null ? (
					<section className="concept-network concept-network--status" role="alert">{networkError}</section>
				) : (
					<ConceptNetwork
						model={network}
						title={networkTitle}
						instructions={networkInstructions}
						closeLabel={networkCloseLabel}
						onSelectConcept={onOpenNetwork}
						onClose={onCloseNetwork}
					/>
				)}
			</div>
		</article>
	);
}
