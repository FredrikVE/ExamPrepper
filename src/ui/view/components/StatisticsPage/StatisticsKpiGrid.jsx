// src/ui/view/components/StatisticsPage/StatisticsKpiGrid.jsx
import { BookOpen, CheckCircle2, Star, Target } from "lucide-react";

export default function StatisticsKpiGrid({ cards, ariaLabel }) {
	return (
		<section className="statistics-kpi-grid" aria-label={ariaLabel}>
			{cards.map((card) => (
				<article key={card.id} className={`statistics-kpi-card statistics-kpi-card--${card.tone}`}>
					<div className="statistics-kpi-header">
						<KpiIcon iconKey={card.iconKey} />
						<p>{card.label}</p>
					</div>
					<strong className="statistics-kpi-value">{card.value}</strong>
					<KpiSparkline sparkline={card.sparkline} />
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
		<div className="statistics-kpi-icon" aria-hidden="true">
			<Icon size={20} />
		</div>
	);
}

const SPARKLINE_WIDTH = 220;
const SPARKLINE_HEIGHT = 38;
const SPARKLINE_PADDING = 4;
const SPARKLINE_DOT_RADIUS = 2.4;
const SPARKLINE_STROKE_WIDTH = 2.2;

function KpiSparkline({ sparkline }) {
	if (!sparkline || sparkline.points.length < 2) {
		return null;
	}

	return sparkline.type === "line"
		? <LineSparkline points={sparkline.points} />
		: <BarSparkline points={sparkline.points} />;
}

function LineSparkline({ points }) {
	const coords = mapToCoordinates(points);
	const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");

	return (
		<svg
			className="statistics-kpi-sparkline"
			viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
			aria-hidden="true"
		>
			<polyline
				points={polylinePoints}
				fill="none"
				stroke="var(--statistics-kpi-accent)"
				strokeWidth={SPARKLINE_STROKE_WIDTH}
			/>
			{coords.map((c, i) => (
				<circle
					key={i}
					cx={c.x}
					cy={c.y}
					r={SPARKLINE_DOT_RADIUS}
					fill="#fff"
					stroke="var(--statistics-kpi-accent)"
					strokeWidth="2"
				/>
			))}
		</svg>
	);
}

function BarSparkline({ points }) {
	const barWidth = 3;
	const maxHeight = SPARKLINE_HEIGHT - SPARKLINE_PADDING * 2;
	const gap = (SPARKLINE_WIDTH - SPARKLINE_PADDING * 2) / points.length;
	const maxVal = Math.max(...points, 1);

	return (
		<svg
			className="statistics-kpi-sparkline"
			viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
			aria-hidden="true"
		>
			{points.map((value, i) => {
				const barHeight = Math.max(3, (value / maxVal) * maxHeight);
				const x = SPARKLINE_PADDING + i * gap + (gap - barWidth) / 2;
				const y = SPARKLINE_HEIGHT - SPARKLINE_PADDING - barHeight;

				return (
					<rect
						key={i}
						x={x}
						y={y}
						width={barWidth}
						height={barHeight}
						rx="1"
						fill="var(--statistics-kpi-accent)"
					/>
				);
			})}
		</svg>
	);
}

function mapToCoordinates(points) {
	const maxVal = Math.max(...points, 1);
	const minVal = Math.min(...points, 0);
	const range = maxVal - minVal || 1;
	const usableHeight = SPARKLINE_HEIGHT - SPARKLINE_PADDING * 2;
	const usableWidth = SPARKLINE_WIDTH - SPARKLINE_PADDING * 2;

	return points.map((value, i) => ({
		x: SPARKLINE_PADDING + (i / (points.length - 1)) * usableWidth,
		y: SPARKLINE_PADDING + (1 - (value - minVal) / range) * usableHeight
	}));
}
