// src/ui/view/components/StatisticsPage/StatisticsKpiGrid.jsx
export default function StatisticsKpiGrid({ cards }) {
	return (
		<section className="statistics-kpi-grid" aria-label="Statistikk nøkkeltall">
			{cards.map((card) => (
				<article key={card.id} className="statistics-kpi-card">
					<div className="statistics-kpi-header">
						<KpiIcon iconKey={card.iconKey} />
						<p>{card.label}</p>
					</div>
					<strong className="statistics-kpi-value">{card.value}</strong>
					<span>{card.description}</span>
				</article>
			))}
		</section>
	);
}

const KPI_ICONS = {
	chart: (
		<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 17V7l4.5 4L11 6l5.5 5.5L18 10" />
		</svg>
	),
	star: (
		<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
			<path d="M10 2l2.4 5 5.6.8-4 3.9 1 5.3-5-2.6-5 2.6 1-5.3-4-3.9 5.6-.8z" />
		</svg>
	),
	check: (
		<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="10" cy="10" r="7.5" />
			<path d="M7 10l2 2 4-4" />
		</svg>
	),
	book: (
		<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 4.5C4.5 3.5 7 3 10 4.5M17 4.5C15.5 3.5 13 3 10 4.5M10 4.5V17M3 4.5v11c1.5-1 4-1.5 7 0m7-11v11c-1.5-1-4-1.5-7 0" />
		</svg>
	)
};

function KpiIcon({ iconKey }) {
	const icon = KPI_ICONS[iconKey];

	if (!icon) {
		return null;
	}

	return <span className="statistics-kpi-icon" aria-hidden="true">{icon}</span>;
}
