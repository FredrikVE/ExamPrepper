// src/ui/view/components/FlipcardsPage/FlipcardDeck/Flipcard.jsx
import { motion } from "motion/react";
import CardFaces from "./CardFaces.jsx";
import SwipeIndicators from "./SwipeIndicators.jsx";
import { useFlipcardMotionInteraction } from "./useFlipcardMotionInteraction.js";

export default function Flipcard(props) {
	const motionInteraction = useFlipcardMotionInteraction({
		cardId: props.cardId,
		swipeCommand: props.swipeCommand,
		onSwipePractice: props.onSwipePractice,
		onSwipeMastered: props.onSwipeMastered
	});

	const stopButtonPointerPropagation = (event) => {
		event.stopPropagation();
	};

	return (
		<motion.article
			className="flipcard"
			aria-label={props.label}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.2}
			style={{ x: motionInteraction.x, rotate: motionInteraction.rotate }}
			onDragEnd={motionInteraction.handleDragEnd}
			whileTap={{ cursor: "grabbing" }}
		>
			<SwipeIndicators
				labels={props.labels}
				practiceOpacity={motionInteraction.practiceOpacity}
				masteredOpacity={motionInteraction.masteredOpacity}
				practiceHintOpacity={motionInteraction.practiceHintOpacity}
				masteredHintOpacity={motionInteraction.masteredHintOpacity}
				practiceBadgeScale={motionInteraction.practiceBadgeScale}
				masteredBadgeScale={motionInteraction.masteredBadgeScale}
			/>

			<button
				type="button"
				className="card-edge-action card-edge-action-left"
				onClick={props.onRequestPracticeSwipe}
				onPointerDown={stopButtonPointerPropagation}
				disabled={props.isSwipeCommandActive || motionInteraction.isCompletingSwipe}
				aria-label={props.labels.practiceCardLabel}
			>
				<span aria-hidden="true">×</span>
			</button>

			<button
				type="button"
				className="card-edge-action card-edge-action-right"
				onClick={props.onRequestMasteredSwipe}
				onPointerDown={stopButtonPointerPropagation}
				disabled={props.isSwipeCommandActive || motionInteraction.isCompletingSwipe}
				aria-label={props.labels.masteredCardLabel}
			>
				<span aria-hidden="true">✓</span>
			</button>

			<CardFaces term={props.term} definition={props.definition} isFlipped={props.isFlipped} />
		</motion.article>
	);
}
