// src/ui/view/components/StatisticsPage/Overview/StatisticsChapterCard.jsx
import { getContentIcon } from "../../Shared/contentIconRegistry.js";

export default function StatisticsChapterCard({ model }) {
	const ChapterIcon = getContentIcon(model.iconKey);

	return (
		<article className="statistics-chapter-card" data-performance-tone={model.performanceTone}>
			<div className="statistics-chapter-card-icon" aria-hidden="true">
				<ChapterIcon />
			</div>
			<div className="statistics-chapter-card-copy">
				<h3>{model.label}</h3>
				<strong className="statistics-chapter-card-score">{model.masteryPercentageLabel}</strong>
				<p>{model.masteryLabel}</p>
			</div>
		</article>
	);
}
