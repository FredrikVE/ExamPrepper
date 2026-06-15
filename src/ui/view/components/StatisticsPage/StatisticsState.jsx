// src/ui/view/components/StatisticsPage/StatisticsState.jsx
export default function StatisticsState({ title, body, actionLabel, onAction }) {
	return (
		<section className="statistics-state">
			<h2>{title}</h2>
			<p>{body}</p>

			{actionLabel && onAction ? (
				<button type="button" className="statistics-state-button" onClick={onAction}>
					{actionLabel}
				</button>
			) : null}
		</section>
	);
}
