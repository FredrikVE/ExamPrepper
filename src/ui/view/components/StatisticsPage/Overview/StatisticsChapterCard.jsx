// src/ui/view/components/StatisticsPage/Overview/StatisticsChapterCard.jsx
import { getContentIcon } from "../../Shared/contentIconRegistry.js";

export default function StatisticsChapterCard({ model }) {
	const ChapterIcon = getContentIcon(model.iconKey);

	return (
		<article className="statistics-chapter-card">
			<div className="statistics-chapter-card-icon" aria-hidden="true">
				<ChapterIcon />
			</div>
			<div className="statistics-chapter-card-copy">
				<h3>{model.label}</h3>
				<p>{model.evidenceLabel}</p>
			</div>
			<strong className="statistics-chapter-card-score">{model.scoreLabel}</strong>
		</article>
	);
}
