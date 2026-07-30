//src/ui/view/components/LearningSessionPage/LearningSessionStage.jsx
export default function LearningSessionStage({ children, focusRef, focusLabel }) {
	return (
		<section className="learning-session-stage" aria-label={focusLabel}>
			<div ref={focusRef} tabIndex={-1}>{children}</div>
		</section>
	);
}
