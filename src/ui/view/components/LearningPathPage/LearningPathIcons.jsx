// src/ui/view/components/LearningPathPage/LearningPathIcons.jsx
import { Check, LockKeyhole, Play, Repeat2, TrendingUp } from "lucide-react";

const ICONS = {
	check: Check,
	lock: LockKeyhole,
	play: Play,
	repeat: Repeat2,
	trending: TrendingUp
};

export default function LearningPathStatusIcon({ iconKey, fallbackValue }) {
	let Icon = null;

	if (iconKey !== null) {
		Icon = ICONS[iconKey] ?? null;
	}

	if (Icon === null) {
		return (
			<span aria-hidden="true">
				{fallbackValue}
			</span>
		);
	}

	return (
		<Icon aria-hidden="true" />
	);
}