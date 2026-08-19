// src/ui/view/components/LearningPathPage/LearningPathSessionNode.jsx
import { Check, Lock, Play } from "lucide-react";
import LearningPathSessionScore from "./LearningPathSessionScore.jsx";

export default function LearningPathSessionNode({ model, onSelected }) {
	const content = <LearningPathSessionContent model={model} />;
	return (
		<li className={`learning-path-session-node learning-path-session-node--${model.appearance}${model.isSelectable ? " learning-path-session-node--selectable" : ""}`}>
			{model.isSelectable
				? <button type="button" className="learning-path-session-node__button" disabled={model.actionModel.isDisabled} onClick={() => onSelected(model.actionModel)} aria-label={model.actionModel.label}>{content}</button>
				: <div className="learning-path-session-node__content">{content}</div>}
		</li>
	);
}

function LearningPathSessionContent({ model }) {
	const Icon = model.iconKey === "check" ? Check : model.iconKey === "lock" ? Lock : Play;
	return (
		<>
			<span className="learning-path-session-node__visual">
				{model.iconKey === "score"
					? <LearningPathSessionScore model={model.scoreModel} />
					: <span className="learning-path-session-node__icon"><Icon aria-hidden="true" /></span>}
				{model.isSelectable ? <span className="learning-path-session-node__hover-play" aria-hidden="true"><Play /></span> : null}
			</span>
			<span className="learning-path-session-node__copy">
				<strong>{model.label}</strong>
				<small>{model.metaLabel}</small>
			</span>
			<span className="learning-path-session-node__status">{model.statusLabel}</span>
		</>
	);
}
