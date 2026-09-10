// src/ui/view/components/StatisticsPage/Overview/Development/Charts/StatisticsScoreChart.jsx
import { useRef, useState } from "react";
import { STATISTICS_CHART_LAYOUT_MODES } from "../../../../../../../constants/StatisticsContracts.js";

const STATISTICS_CHART_GRID_LINES = Object.freeze([100, 75, 50, 25, 0]);
const CHART_POINT_STEP_PX = 52;
const CHART_BAR_WIDTH_PX = 38;

export default function StatisticsScoreChart({ id, label, points, axisTicks, layoutMode, emptyLabel }) {
	const chartRef = useRef(null);
	const hoveredPointRef = useRef(null);
	const focusedPointRef = useRef(null);
	const [activeTooltip, setActiveTooltip] = useState(null);
	let usesCompactSlots = false;
	let usesHorizontalScroll = false;

	if (layoutMode === STATISTICS_CHART_LAYOUT_MODES.COMPACT) {
		usesCompactSlots = true;
	}

	else if (layoutMode === STATISTICS_CHART_LAYOUT_MODES.SEQUENCE) {
		usesCompactSlots = true;
		usesHorizontalScroll = true;
	}

	else if (layoutMode !== STATISTICS_CHART_LAYOUT_MODES.TIME) {
		throw new Error(`Unknown Statistics chart layout mode: ${String(layoutMode)}`);
	}

	if (points.length === 0) {
		return <p id={id} className="statistics-score-chart-empty">{emptyLabel}</p>;
	}

	const plotStyle = {};

	if (usesHorizontalScroll) {
		const sequenceContentWidthPx = Math.max(
			CHART_BAR_WIDTH_PX,
			(points.length - 1) * CHART_POINT_STEP_PX + CHART_BAR_WIDTH_PX
		);
		plotStyle["--statistics-score-chart-sequence-content-width"] = `${sequenceContentWidthPx}px`;
	}

	const showTooltip = (point, pointElement) => {
		const chartElement = chartRef.current;

		if (chartElement === null) {
			return;
		}

		const chartRect = chartElement.getBoundingClientRect();
		const pointRect = pointElement.getBoundingClientRect();
		const leftPx = pointRect.left + pointRect.width / 2 - chartRect.left;

		setActiveTooltip({
			label: point.label,
			valueLabel: point.valueLabel,
			leftPx
		});
	};

	const showFallbackTooltip = () => {
		let activePoint = hoveredPointRef.current;

		if (activePoint === null) {
			activePoint = focusedPointRef.current;
		}

		if (activePoint === null) {
			setActiveTooltip(null);
			return;
		}

		showTooltip(activePoint.point, activePoint.pointElement);
	};

	const handleMouseEnter = (point, pointElement) => {
		hoveredPointRef.current = {
			point,
			pointElement
		};
		showTooltip(point, pointElement);
	};

	const handleMouseLeave = () => {
		hoveredPointRef.current = null;
		showFallbackTooltip();
	};

	const handleFocus = (point, pointElement) => {
		focusedPointRef.current = {
			point,
			pointElement
		};
		showTooltip(point, pointElement);
	};

	const handleBlur = () => {
		focusedPointRef.current = null;
		showFallbackTooltip();
	};

	const handleScroll = () => {
		showFallbackTooltip();
	};

	return (
		<div ref={chartRef} id={id} className="statistics-score-chart" data-layout-mode={layoutMode} aria-label={label}>
			<div className="statistics-score-chart-scroll" onScroll={handleScroll}>
				<div className="statistics-score-chart-plot" style={plotStyle}>
					<div className="statistics-score-chart-grid" aria-hidden={true}>
						{STATISTICS_CHART_GRID_LINES.map((value) => (
							<div key={value} className="statistics-score-chart-gridline">
								<span>{value} %</span>
							</div>
						))}
					</div>

					<ol className="statistics-score-chart-list">
						{points.map((point, index) => {
							let pointStyle = {
								"--statistics-score-chart-position": point.positionPercent
							};

							if (usesCompactSlots) {
								pointStyle = {
									"--statistics-score-chart-slot-left": `${index * CHART_POINT_STEP_PX}px`
								};
							}

							return (
								<li
									key={point.key}
									className="statistics-score-chart-point"
									data-latest={point.isLatest}
									aria-label={`${point.label}, ${point.valueLabel}`}
									style={pointStyle}
									tabIndex={0}
									onMouseEnter={(event) => handleMouseEnter(point, event.currentTarget)}
									onMouseLeave={handleMouseLeave}
									onFocus={(event) => handleFocus(point, event.currentTarget)}
									onBlur={handleBlur}
								>
									<div className="statistics-score-chart-bar-area" aria-hidden={true}>
										<span
											className="statistics-score-chart-bar"
											data-latest={point.isLatest}
											style={{ "--statistics-score-chart-value": `${point.value}%` }}
										/>
									</div>
								</li>
							);
						})}
					</ol>

					<div className="statistics-score-chart-axis-labels" aria-hidden={true}>
						{axisTicks.map((tick, index) => {
							let tickStyle = {
								"--statistics-score-chart-position": tick.positionPercent
							};

							if (usesCompactSlots) {
								tickStyle = {
									"--statistics-score-chart-slot-left": `${index * CHART_POINT_STEP_PX}px`
								};
							}

							return <span key={tick.key} style={tickStyle}>{tick.label}</span>;
						})}
					</div>
				</div>
			</div>

			{activeTooltip !== null && (
				<div className="statistics-score-chart-tooltip-layer" aria-hidden={true}>
					<span
						className="statistics-score-chart-tooltip"
						style={{ "--statistics-score-chart-tooltip-left": `${activeTooltip.leftPx}px` }}
					>
						<strong>{activeTooltip.valueLabel}</strong>
						<span>{activeTooltip.label}</span>
					</span>
				</div>
			)}
		</div>
	);
}
