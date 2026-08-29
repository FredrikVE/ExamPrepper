// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailRelations.jsx
import { ChevronDown, ChevronUp, Link2 } from "lucide-react";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "../../../../viewmodel/GlossaryPage/glossaryNetworkModel.js";

export default function GlossaryDetailRelations({ model, isInteractive }) {
	return (
		<section className="glossary-detail-modal__relations">
			<h3 className="glossary-detail-modal__relations-heading">
				<Link2 className="glossary-detail-modal__relations-icon" aria-hidden="true" />
				<span>{model.heading}</span>
				<span className="glossary-detail-modal__relations-count">
					({model.count})
				</span>
			</h3>

			<div className="glossary-detail-modal__relations-card">
				<RelationContent
					model={model}
					isInteractive={isInteractive}
				/>
			</div>
		</section>
	);
}

function RelationContent({ model, isInteractive }) {
	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return (
			<p className="glossary-detail-modal__relations-status" role="status">
				{model.display.message}
			</p>
		);
	}

	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return (
			<p className="glossary-detail-modal__relations-status" role="alert">
				{model.display.message}
			</p>
		);
	}

	if (model.display.items.length === 0) {
		return (
			<p className="glossary-detail-modal__relations-status">
				{model.display.emptyLabel}
			</p>
		);
	}

	return (
		<>
			<div className="glossary-detail-modal__relation-list">
				{model.display.items.map((item) => (
					<RelationRow
						key={item.glossaryEntryKey}
						item={item}
						isInteractive={isInteractive}
					/>
				))}
			</div>

			{model.display.toggle !== null ? (
				<RelationToggle
					model={model.display.toggle}
					isInteractive={isInteractive}
				/>
			) : null}
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
	const icon = model.isExpanded
		? <ChevronUp className="glossary-detail-modal__relations-toggle-icon" aria-hidden="true" />
		: <ChevronDown className="glossary-detail-modal__relations-toggle-icon" aria-hidden="true" />;

	if (!isInteractive) {
		return (
			<div className="glossary-detail-modal__relations-toggle">
				<span>{model.label}</span>
				{icon}
			</div>
		);
	}

	return (
		<button
			type="button"
			className="glossary-detail-modal__relations-toggle"
			aria-expanded={model.isExpanded}
			onClick={model.onActivate}
		>
			<span>{model.label}</span>
			{icon}
		</button>
	);
}
