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

function getFlipcardClassName(params) {
	const classNames = ["flipcard"];

	if (params.edgeHoverDirection === EDGE_HOVER_DIRECTION.PRACTICE) {
		classNames.push("flipcard-edge-hover-practice");
	}

	if (params.edgeHoverDirection === EDGE_HOVER_DIRECTION.MASTERED) {
		classNames.push("flipcard-edge-hover-mastered");
	}

	if (params.isHoverPreviewActive) {
		classNames.push("flipcard-hover-preview-active");
	}

	if (params.isHoverBorderReady) {
		classNames.push("flipcard-hover-border-ready");
	}

	if (params.isInteractionDisabled) {
		classNames.push("flipcard-interaction-disabled");
	}

	if (params.isFlipped) {
		classNames.push("flipcard-card-flipped");
	}

	return classNames.join(" ");
}

export default function Flipcard(props) {
	const [edgeHoverDirection, setEdgeHoverDirection] = useState(EDGE_HOVER_DIRECTION.NONE);
	const motionInteraction = useFlipcardMotionInteraction({
		cardId: props.cardId,
		swipeCommand: props.swipeCommand,
		onSwipePractice: props.onSwipePractice,
		onSwipeMastered: props.onSwipeMastered
	});
	const isInteractionDisabled = props.isSwipeCommandActive || motionInteraction.isCompletingSwipe;
	const className = getFlipcardClassName({
		edgeHoverDirection,
		isHoverPreviewActive: props.isHoverPreviewActive,
		isHoverBorderReady: props.isHoverBorderReady,
		isInteractionDisabled,
		isFlipped: props.isFlipped
	});

	const stopButtonPointerPropagation = (event) => {
		event.stopPropagation();
	};

	const showPracticeEdgeHover = useCallback(() => {
		if (isInteractionDisabled) {
			return;
		}

		setEdgeHoverDirection(EDGE_HOVER_DIRECTION.PRACTICE);
	}, [isInteractionDisabled]);

	const showMasteredEdgeHover = useCallback(() => {
		if (isInteractionDisabled) {
			return;
		}

		setEdgeHoverDirection(EDGE_HOVER_DIRECTION.MASTERED);
	}, [isInteractionDisabled]);

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
				disabled={isInteractionDisabled}
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
				disabled={isInteractionDisabled}
				aria-label={props.labels.masteredCardLabel}
			>
				<span aria-hidden="true">✓</span>
			</button>

			<CardFaces term={props.term} definition={props.definition} isFlipped={props.isFlipped} />
		</motion.article>
	);
}
