// src/ui/view/components/FlipcardsPage/FlipcardDeck/Flipcard.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
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
			/>
			<motion.div
				className="swipe-indicator-proxy swipe-indicator-proxy-practice"
				style={{ opacity: motionInteraction.practiceOpacity }}
				aria-hidden="true"
			/>
			<motion.div
				className="swipe-indicator-proxy swipe-indicator-proxy-mastered"
				style={{ opacity: motionInteraction.masteredOpacity }}
				aria-hidden="true"
			/>
			<button
				type="button"
				className="flipcard-nav flipcard-nav-previous"
				onClick={props.onPrevious}
				onPointerDown={(event) => event.stopPropagation()}
				disabled={!props.hasPrevious || motionInteraction.isCompletingSwipe}
				aria-label={props.labels.previousCardLabel}
			>
				<ChevronLeft aria-hidden="true" focusable="false" />
			</button>

			<button
				type="button"
				className="flipcard-nav flipcard-nav-next"
				onClick={props.onNext}
				onPointerDown={(event) => event.stopPropagation()}
				disabled={!props.hasNext || motionInteraction.isCompletingSwipe}
				aria-label={props.labels.nextCardLabel}
			>
				<ChevronRight aria-hidden="true" focusable="false" />
			</button>

			<CardFaces term={props.term} definition={props.definition} isFlipped={props.isFlipped} />
		</motion.article>
	);
}
