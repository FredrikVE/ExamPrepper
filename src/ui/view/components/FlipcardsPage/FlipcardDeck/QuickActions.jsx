// src/ui/view/components/FlipcardsPage/FlipcardDeck/QuickActions.jsx
import { Check, RotateCcw, X } from "lucide-react";

export default function QuickActions(props) {
	return (
		<div className="quick-actions" aria-label={props.labels.quickActionsLabel}>
			<button
				type="button"
				className="quick-action quick-action-practice"
				onClick={props.onPractice}
				disabled={props.isSwipeCommandActive}
			>
				<X aria-hidden="true" focusable="false" />
				<span>{props.labels.practiceCardLabel}</span>
			</button>

			<button
				type="button"
				className="quick-action quick-action-flip"
				onClick={props.onFlip}
				disabled={props.isSwipeCommandActive}
			>
				<RotateCcw aria-hidden="true" focusable="false" />
				<span>{props.labels.flipCardLabel}</span>
			</button>

			<button
				type="button"
				className="quick-action quick-action-mastered"
				onClick={props.onMastered}
				disabled={props.isSwipeCommandActive}
			>
				<Check aria-hidden="true" focusable="false" />
				<span>{props.labels.masteredCardLabel}</span>
			</button>
		</div>
	);
}
