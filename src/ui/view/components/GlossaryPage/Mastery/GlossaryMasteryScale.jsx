// src/ui/view/components/GlossaryPage/Mastery/GlossaryMasteryScale.jsx
import { Check } from "lucide-react";

export default function GlossaryMasteryScale({ mastery }) {
	let statusNote = null;

	if (!mastery.isAssessed) {
		statusNote = (
			<span className="glossary-mastery-scale__status">
				{mastery.statusLabel}
			</span>
		);
	}

	return (
		<div
			className="glossary-mastery-scale-shell"
			role="group"
			aria-label={mastery.ariaLabel}
		>
			<div className="glossary-mastery-scale" aria-hidden="true">
				{mastery.scaleItems.map((item) => (
					<GlossaryMasteryScaleItem key={item.status} item={item} />
				))}
			</div>

			{statusNote}
		</div>
	);
}

function GlossaryMasteryScaleItem({ item }) {
	let selectedMark = null;

	if (item.isActive) {
		selectedMark = (
			<Check
				className="glossary-mastery-scale__selected-mark"
				aria-hidden="true"
			/>
		);
	}

	return (
		<span
			className="glossary-mastery-scale__item"
			data-mastery-status={item.status}
			data-active={String(item.isActive)}
		>
			<span>{item.label}</span>
			{selectedMark}
		</span>
	);
}
