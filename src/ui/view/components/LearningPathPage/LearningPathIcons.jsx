//src/ui/view/components/LearningPathPage/LearningPathIcons.jsx
import { Check, LockKeyhole, Play, Repeat2, TrendingUp } from "lucide-react";

const ICONS = Object.freeze({
	check: Check,
	lock: LockKeyhole,
	play: Play,
	repeat: Repeat2,
	trending: TrendingUp
});

export default function LearningPathStatusIcon({ iconKey, fallbackValue }) {
	const Icon = iconKey === null ? null : ICONS[iconKey] ?? null;
	return Icon === null ? <span aria-hidden="true">{fallbackValue}</span> : <Icon aria-hidden="true" />;
}
