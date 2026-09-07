// src/ui/view/components/StatisticsPage/Overview/StatisticsChapterOverview.jsx
import StatisticsChapterCard from "./StatisticsChapterCard.jsx";

export default function StatisticsChapterOverview({ model }) {
	return (
		<section className="statistics-chapter-overview" aria-labelledby="statistics-chapters-title">
			<header className="statistics-overview-section-header">
				<div>
					<h2 id="statistics-chapters-title">{model.title}</h2>
					<p>{model.subtitle}</p>
				</div>
			</header>
			<div className="statistics-chapter-grid">
				{model.items.map((chapter) => <StatisticsChapterCard key={chapter.key} model={chapter} />)}
			</div>
		</section>
	);
}
