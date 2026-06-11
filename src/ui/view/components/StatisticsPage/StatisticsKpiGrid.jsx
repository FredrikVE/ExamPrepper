// src/ui/view/components/StatisticsPage/StatisticsKpiGrid.jsx
export default function StatisticsKpiGrid({ cards }) {
	return (
		<section className="statistics-kpi-grid" aria-label="Statistikk nøkkeltall">
			{cards.map((card) => (
				<article key={card.id} className="statistics-kpi-card">
					<p>{card.label}</p>
					<strong>{card.value}</strong>
					<span>{card.description}</span>
				</article>
			))}
		</section>
	);
}
