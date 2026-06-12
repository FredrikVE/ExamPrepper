// src/ui/view/components/StatisticsPage/StatisticsKpiGrid.jsx
import { BookOpen, CheckCircle2, Star, Target } from "lucide-react";

export default function StatisticsKpiGrid({ cards, ariaLabel }) {
	return (
		<section className="statistics-kpi-grid" aria-label={ariaLabel}>
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
	chart: Target,
	star: Star,
	check: CheckCircle2,
	book: BookOpen
};

function KpiIcon({ iconKey }) {
	const Icon = KPI_ICONS[iconKey];

	if (!Icon) {
		return null;
	}

	return (
		<span className="statistics-kpi-icon" aria-hidden="true">
			<Icon size={20} strokeWidth={1.8} />
		</span>
	);
}
