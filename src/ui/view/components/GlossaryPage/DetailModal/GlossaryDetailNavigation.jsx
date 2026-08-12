// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailNavigation.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GlossaryDetailNavigation({ model }) {
	return (
		<nav className="glossary-detail-modal__navigation" aria-label={model.ariaLabel}>
			<button type="button" className="glossary-detail-modal__navigation-button" disabled={model.previous.isDisabled} onClick={model.previous.onActivate}>
				<ChevronLeft size={18} strokeWidth={2.1} aria-hidden="true" />
				<span>{model.previous.label}</span>
			</button>

			<span className="glossary-detail-modal__position" aria-live="polite">
				{model.positionLabel}
			</span>

			<button type="button" className="glossary-detail-modal__navigation-button" disabled={model.next.isDisabled} onClick={model.next.onActivate}>
				<span>{model.next.label}</span>
				<ChevronRight size={18} strokeWidth={2.1} aria-hidden="true" />
			</button>
		</nav>
	);
}
