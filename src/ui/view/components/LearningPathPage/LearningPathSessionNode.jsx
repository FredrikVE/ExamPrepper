// src/ui/view/components/LearningPathPage/LearningPathSessionNode.jsx
import { Check, Lock, Play } from "lucide-react";
import LearningPathSessionScore from "./LearningPathSessionScore.jsx";

export default function LearningPathSessionNode({ model }) {
	const Icon = model.iconKey === "check" ? Check : model.iconKey === "lock" ? Lock : Play;
	return (
		<li className={`learning-path-session-node learning-path-session-node--${model.appearance}`}>
			{model.iconKey === "score"
				? <LearningPathSessionScore model={model.scoreModel} />
				: <span className="learning-path-session-node__icon"><Icon aria-hidden="true" /></span>}
			<span className="learning-path-session-node__copy">
				<strong>{model.label}</strong>
				<small>{model.metaLabel}</small>
			</span>
			<span className="learning-path-session-node__status">{model.statusLabel}</span>
		</li>
	);
}
