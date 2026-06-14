// src/ui/view/components/StatisticsPage/StatisticsRecommendedExam.jsx
import { BookOpen, Heart } from "lucide-react";

export default function StatisticsRecommendedExam({ title, recommendation }) {
	if (!recommendation) {
		return null;
	}

	return (
		<article className="statistics-panel statistics-recommended-panel">
			<h2 className="statistics-recommended-heading">
				<span className="statistics-recommended-heart" aria-hidden="true">
					<Heart size={16} />
				</span>
				{title}
			</h2>

			<div className="statistics-recommended-card">
				<div className="statistics-recommended-icon" aria-hidden="true">
					<BookOpen size={28} />
				</div>

				<div className="statistics-recommended-content">
					<p className="statistics-recommended-title">{recommendation.title}</p>
					<p className="statistics-recommended-body">{recommendation.body}</p>

					<div className="statistics-recommended-footer">
						<span className="statistics-recommended-badge">{recommendation.badgeLabel}</span>
						<span className="statistics-recommended-action">{recommendation.actionLabel}</span>
					</div>
				</div>
			</div>
		</article>
	);
}
