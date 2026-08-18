//src/ui/view/components/LearningSessionPage/LearningSessionHeader.jsx
export default function LearningSessionHeader({ model }) {
	if (model === null) return null;
	return (
		<header className="learning-session-heading">
			<div><h1>{model.title}</h1><p>{model.contextLabel}</p></div>
			<strong>{model.counterLabel}</strong>
		</header>
	);
}
