// src/ui/view/components/StatisticsPage/StatisticsRecentAttempts.jsx
export default function StatisticsRecentAttempts({ title, subtitle, emptyMessage, attempts }) {
	return (
		<section className="statistics-panel" aria-labelledby="statistics-recent-attempts-title">
			<div className="statistics-panel-header">
				<div>
					<h2 id="statistics-recent-attempts-title">{title}</h2>
					<p>{subtitle}</p>
				</div>
			</div>

			{attempts.length === 0 ? (
				<p className="statistics-empty-text">{emptyMessage}</p>
			) : (
				<ul className="statistics-attempt-list">
					{attempts.map((attempt) => (
						<li key={attempt.id} className="statistics-attempt-item">
							<div>
								<strong>{attempt.examTitle}</strong>
								<span>{attempt.submittedAtLabel}</span>
							</div>

							<div className="statistics-attempt-score">
								<strong>{attempt.percentageLabel}</strong>
								<span>{attempt.pointsLabel}</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
