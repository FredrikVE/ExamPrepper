// src/ui/view/components/LearningPathPage/LearningPathModuleCard.jsx
import { ChevronRight } from "lucide-react";
import LearningPathMasteryRing from "./LearningPathMasteryRing.jsx";

export default function LearningPathModuleCard({ model, onPressed }) {
	return (
		<button type="button" className={`learning-path-module-card learning-path-module-card--${model.appearance}`} aria-expanded={model.isExpanded} aria-current={model.isCurrentStep ? "step" : undefined} aria-label={model.chevronLabel} disabled={model.isDisabled} onClick={onPressed}>
			<span className="learning-path-module-card__copy">
				<span className="learning-path-module-card__eyebrow">{model.eyebrow}</span>
				<span className="learning-path-module-card__title">{model.title}</span>
				<span className="learning-path-module-card__status">{model.progressSummaryLabel}</span>
			</span>
			<span className="learning-path-module-card__trailing">
				<LearningPathMasteryRing model={model.masteryRingModel} />
				<ChevronRight className="learning-path-module-card__chevron" aria-hidden="true" />
			</span>
		</button>
	);
}
