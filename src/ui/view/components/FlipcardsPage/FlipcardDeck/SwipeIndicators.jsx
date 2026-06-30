// src/ui/view/components/FlipcardsPage/FlipcardDeck/SwipeIndicators.jsx
import { motion } from "motion/react";

export default function SwipeIndicators(props) {
	return (
		<div className="swipe-indicators" aria-hidden="true">
			<motion.div
				className="swipe-hint swipe-hint-practice"
				style={{ opacity: props.practiceHintOpacity }}
			/>
			<motion.div
				className="swipe-hint swipe-hint-mastered"
				style={{ opacity: props.masteredHintOpacity }}
			/>

			<motion.span
				className="swipe-badge swipe-badge-practice"
				style={{
					opacity: props.practiceOpacity,
					scale: props.practiceBadgeScale
				}}
			>
				{props.labels.practiceCardLabel}
			</motion.span>
			<motion.span
				className="swipe-badge swipe-badge-mastered"
				style={{
					opacity: props.masteredOpacity,
					scale: props.masteredBadgeScale
				}}
			>
				{props.labels.masteredCardLabel}
			</motion.span>
		</div>
	);
}
