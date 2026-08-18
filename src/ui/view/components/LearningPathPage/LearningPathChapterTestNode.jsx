import { ClipboardCheck, Lock } from "lucide-react";

export default function LearningPathChapterTestNode({ model, onSelected }) {
	const Icon = model.isDisabled ? Lock : ClipboardCheck;
	return (
		<button type="button" className={`learning-path-chapter-test-node learning-path-chapter-test-node--${model.status}`} disabled={model.isDisabled} onClick={() => onSelected(model.baseId)}>
			<Icon aria-hidden="true" />
			<span><strong>{model.label}</strong><small>{model.statusLabel}</small></span>
		</button>
	);
}
