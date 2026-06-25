// src/ui/view/components/FlipcardsPage/FlipcardDeck/SwipeIndicators.jsx
import { motion } from "motion/react";

export default function SwipeIndicators({ labels, practiceOpacity, masteredOpacity }) {
    return (
        <div className="swipe-indicators" aria-hidden="true">
            <motion.span
                className="swipe-indicator swipe-indicator-practice"
                style={{ opacity: practiceOpacity }}
            >
                {labels.practiceCardLabel}
            </motion.span>
            <motion.span
                className="swipe-indicator swipe-indicator-mastered"
                style={{ opacity: masteredOpacity }}
            >
                {labels.masteredCardLabel}
            </motion.span>
        </div>
    );
}
