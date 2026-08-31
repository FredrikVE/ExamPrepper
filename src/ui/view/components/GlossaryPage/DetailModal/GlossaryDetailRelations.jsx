// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailRelations.jsx
import { ChevronDown, ChevronUp } from "lucide-react";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "../../../../viewmodel/GlossaryPage/glossaryNetworkModel.js";

export default function GlossaryDetailRelations({ model, isInteractive }) {
	return (
		<section className="glossary-detail-modal__relations" aria-label={model.ariaLabel}>
			<div className="glossary-detail-modal__relations-card">
				<div id={model.contentId} hidden={!model.isExpanded}>
					<RelationContent model={model} isInteractive={isInteractive} />
				</div>

				<RelationToggle model={model} isInteractive={isInteractive} />
			</div>
		</section>
	);
}

function RelationContent({ model, isInteractive }) {
	let body;

	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		body = (
			<p className="glossary-detail-modal__relations-status" role="status">
				{model.display.message}
			</p>
		);
	}

	else if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		body = (
			<p className="glossary-detail-modal__relations-status" role="alert">
				{model.display.message}
			</p>
		);
	}

	else if (model.display.items.length === 0) {
		body = (
			<p className="glossary-detail-modal__relations-status">
				{model.display.emptyLabel}
			</p>
		);
	}

	else {
		body = (
			<div className="glossary-detail-modal__relation-list">
				{model.display.items.map((item) => (
					<RelationRow
						key={item.glossaryEntryKey}
						item={item}
						isInteractive={isInteractive}
					/>
				))}
			</div>
		);
	}

	return (
		<>
			<div className="glossary-detail-modal__relations-inner-header">
				{model.contentHeading}
			</div>

			{body}
		</>
	);
}

function RelationRow({ item, isInteractive }) {
	const content = (
		<>
			<span className="glossary-detail-modal__relation-term">
				{item.label}
			</span>

			<span
				className="glossary-detail-modal__relation-type"
				data-relation-type={item.relationType}
			>
				{item.relationLabel}
			</span>
		</>
	);

	if (!isInteractive) {
		return (
			<div className="glossary-detail-modal__relation-row">
				{content}
			</div>
		);
	}

	return (
		<button
			type="button"
			className="glossary-detail-modal__relation-row"
			onClick={item.onActivate}
		>
			{content}
		</button>
	);
}

function RelationToggle({ model, isInteractive }) {
	let icon;
	let label;

	if (model.isExpanded) {
		icon = <ChevronUp className="glossary-detail-modal__relations-toggle-icon" aria-hidden="true" />;
		label = model.closeLabel;
	}

	else {
		icon = <ChevronDown className="glossary-detail-modal__relations-toggle-icon" aria-hidden="true" />;
		label = model.openLabel;
	}

	if (!isInteractive) {
		return (
			<div className="glossary-detail-modal__relations-toggle">
				<span>{label}</span>
				{icon}
			</div>
		);
	}

	return (
		<button
			type="button"
			className="glossary-detail-modal__relations-toggle"
			aria-expanded={model.isExpanded}
			aria-controls={model.contentId}
			onClick={model.onActivate}
		>
			<span>{label}</span>
			{icon}
		</button>
	);
}
