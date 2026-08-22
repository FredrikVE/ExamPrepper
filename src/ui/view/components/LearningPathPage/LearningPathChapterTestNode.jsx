import { ClipboardCheck, Lock } from "lucide-react";
import LearningPathSessionScore from "./LearningPathSessionScore.jsx";

export default function LearningPathChapterTestNode({ model, onSelected }) {
	const Icon = model.isDisabled ? Lock : ClipboardCheck;
	return (
		<button type="button" className={`learning-path-chapter-test-node learning-path-chapter-test-node--${model.status}`} disabled={model.isDisabled} onClick={() => onSelected(model.id)}>
			{model.scoreModel === null ? <span className="learning-path-chapter-test-node__icon"><Icon aria-hidden="true" /></span> : <LearningPathSessionScore model={model.scoreModel} />}
			<span className="learning-path-chapter-test-node__content"><strong>{model.label}</strong><small>{model.statusLabel}</small></span>
		</button>
	);
}
