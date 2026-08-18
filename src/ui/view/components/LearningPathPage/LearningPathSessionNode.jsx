import { Check, Circle, Lock, Play } from "lucide-react";

export default function LearningPathSessionNode({ model }) {
	const Icon = model.status === "completed" ? Check : model.status === "current" ? Play : model.status === "locked" ? Lock : Circle;
	return (
		<li className={`learning-path-session-node learning-path-session-node--${model.appearance}`}>
			<span className="learning-path-session-node__icon"><Icon aria-hidden="true" /></span>
			<span className="learning-path-session-node__copy">
				<strong>{model.label}</strong>
				<small>{model.metaLabel}</small>
			</span>
			<span className="learning-path-session-node__status">{model.statusLabel}</span>
		</li>
	);
}
