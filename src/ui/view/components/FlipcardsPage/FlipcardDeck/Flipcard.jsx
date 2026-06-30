// src/ui/view/components/FlipcardsPage/FlipcardDeck/Flipcard.jsx
import { useCallback, useState } from "react";
import { motion } from "motion/react";
import CardFaces from "./CardFaces.jsx";
import SwipeIndicators from "./SwipeIndicators.jsx";
import { useFlipcardMotionInteraction } from "./useFlipcardMotionInteraction.js";

const EDGE_HOVER_DIRECTION = {
	NONE: "none",
	PRACTICE: "practice",
	MASTERED: "mastered"
};

function getFlipcardClassName(edgeHoverDirection) {
	if (edgeHoverDirection === EDGE_HOVER_DIRECTION.PRACTICE) {
		return "flipcard flipcard-edge-hover-practice";
	}

	if (edgeHoverDirection === EDGE_HOVER_DIRECTION.MASTERED) {
		return "flipcard flipcard-edge-hover-mastered";
	}

	return "flipcard";
}

export default function Flipcard(props) {
	const [edgeHoverDirection, setEdgeHoverDirection] = useState(EDGE_HOVER_DIRECTION.NONE);
	const motionInteraction = useFlipcardMotionInteraction({
		cardId: props.cardId,
		swipeCommand: props.swipeCommand,
		onSwipePractice: props.onSwipePractice,
		onSwipeMastered: props.onSwipeMastered
	});
	const className = getFlipcardClassName(edgeHoverDirection);

	const stopButtonPointerPropagation = (event) => {
		event.stopPropagation();
	};

	const showPracticeEdgeHover = useCallback(() => {
		if (props.isSwipeCommandActive || motionInteraction.isCompletingSwipe) {
			return;
		}

		setEdgeHoverDirection(EDGE_HOVER_DIRECTION.PRACTICE);
	}, [motionInteraction.isCompletingSwipe, props.isSwipeCommandActive]);

	const showMasteredEdgeHover = useCallback(() => {
		if (props.isSwipeCommandActive || motionInteraction.isCompletingSwipe) {
			return;
		}

		setEdgeHoverDirection(EDGE_HOVER_DIRECTION.MASTERED);
	}, [motionInteraction.isCompletingSwipe, props.isSwipeCommandActive]);

	const clearEdgeHover = useCallback(() => {
		setEdgeHoverDirection(EDGE_HOVER_DIRECTION.NONE);
	}, []);

	return (
		<motion.article
			className={className}
			aria-label={props.label}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.2}
			style={{
				x: motionInteraction.x,
				rotate: motionInteraction.rotate,
				"--flipcard-surface-x": motionInteraction.surfaceX,
				"--flipcard-surface-opacity": motionInteraction.surfaceOpacity,
				"--flipcard-practice-surface-opacity": motionInteraction.practiceSurfaceOpacity,
				"--flipcard-mastered-surface-opacity": motionInteraction.masteredSurfaceOpacity,
				"--flipcard-practice-shadow-opacity": motionInteraction.practiceShadowOpacity,
				"--flipcard-mastered-shadow-opacity": motionInteraction.masteredShadowOpacity
			}}
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
				onPointerEnter={showPracticeEdgeHover}
				onPointerLeave={clearEdgeHover}
				onFocus={showPracticeEdgeHover}
				onBlur={clearEdgeHover}
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
				onPointerEnter={showMasteredEdgeHover}
				onPointerLeave={clearEdgeHover}
				onFocus={showMasteredEdgeHover}
				onBlur={clearEdgeHover}
				disabled={props.isSwipeCommandActive || motionInteraction.isCompletingSwipe}
				aria-label={props.labels.masteredCardLabel}
			>
				<span aria-hidden="true">✓</span>
			</button>

			<CardFaces term={props.term} definition={props.definition} isFlipped={props.isFlipped} />
		</motion.article>
	);
}
