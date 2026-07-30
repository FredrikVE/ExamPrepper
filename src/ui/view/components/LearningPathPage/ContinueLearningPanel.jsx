//src/ui/view/components/LearningPathPage/ContinueLearningPanel.jsx
import { ArrowRight } from "lucide-react";

export default function ContinueLearningPanel({ model, onPressed }) {
	if (!model.isVisible) return null;

	return (
		<section className="learning-path-continue-panel" aria-labelledby="learning-path-continue-title">
			<div className="learning-path-continue-panel__copy">
				<h2 id="learning-path-continue-title">{model.title}</h2>
				<p>{model.description}</p>
			</div>
			<button type="button" className="learning-path-continue-action" disabled={model.isDisabled} onClick={onPressed}>
				<span>{model.buttonLabel}</span>
				<ArrowRight aria-hidden="true" />
			</button>
		</section>
	);
}
