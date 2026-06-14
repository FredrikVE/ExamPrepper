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
					<KpiSparkline cardId={card.id} sparkline={card.sparkline} />
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

function KpiSparkline({ cardId, sparkline }) {
	if (!sparkline || sparkline.points.length < 2) {
		return null;
	}

	if (sparkline.type === "line") {
		return <LineSparkline points={sparkline.points} sparklineId={cardId} />;
	}

	return <BarSparkline points={sparkline.points} />;
}

function LineSparkline({ points, sparklineId }) {
	const coords = mapToCoordinates(points);
	const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
	const areaPoints = createLineAreaPoints(coords);
	const areaGradientId = `statisticsKpiSparklineArea-${sparklineId}`;

	return (
		<svg
			className="statistics-kpi-sparkline"
			viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
					<stop className="statistics-kpi-sparkline-area-stop-start" offset="0%" />
					<stop className="statistics-kpi-sparkline-area-stop-end" offset="100%" />
				</linearGradient>
			</defs>
			<polygon
				className="statistics-kpi-sparkline-area"
				points={areaPoints}
				fill={`url(#${areaGradientId})`}
			/>
			<polyline
				className="statistics-kpi-sparkline-line"
				points={polylinePoints}
			/>
			{coords.map((c, i) => (
				<circle
					key={i}
					className="statistics-kpi-sparkline-dot"
					cx={c.x}
					cy={c.y}
					r={SPARKLINE_DOT_RADIUS}
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
						className="statistics-kpi-sparkline-bar"
						x={x}
						y={y}
						width={barWidth}
						height={barHeight}
						rx="1"
					/>
				);
			})}
		</svg>
	);
}

function createLineAreaPoints(coords) {
	const firstPoint = coords[0];
	const lastPoint = coords[coords.length - 1];
	const baselineY = SPARKLINE_HEIGHT - SPARKLINE_PADDING;
	const linePoints = coords.map((c) => `${c.x},${c.y}`);

	return [
		`${firstPoint.x},${baselineY}`,
		...linePoints,
		`${lastPoint.x},${baselineY}`
	].join(" ");
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
