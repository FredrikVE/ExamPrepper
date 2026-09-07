// src/ui/view/components/StatisticsPage/Overview/StatisticsPeriodSelector.jsx
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_EDGE_TOLERANCE_PX = 2;
const SCROLL_DISTANCE_FACTOR = 0.72;

export default function StatisticsPeriodSelector({ label, options, selectedPeriod, previousLabel, nextLabel, onSelectPeriod }) {
	const viewportRef = useRef(null);
	const [scrollState, setScrollState] = useState({ hasOverflow: false, canScrollPrevious: false, canScrollNext: false });
	let selectorClassName = "statistics-period-selector";

	if (!scrollState.hasOverflow) {
		selectorClassName += " statistics-period-selector-static";
	}

	useEffect(() => {
		const viewport = viewportRef.current;

		if (viewport === null) {
			return undefined;
		}

		const updateScrollState = () => {
			const maximumScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
			const hasOverflow = maximumScrollLeft > SCROLL_EDGE_TOLERANCE_PX;
			const canScrollPrevious = hasOverflow && viewport.scrollLeft > SCROLL_EDGE_TOLERANCE_PX;
			const canScrollNext = hasOverflow && viewport.scrollLeft < maximumScrollLeft - SCROLL_EDGE_TOLERANCE_PX;

			setScrollState({ hasOverflow, canScrollPrevious, canScrollNext });
		};

		updateScrollState();
		viewport.addEventListener("scroll", updateScrollState, { passive: true });
		window.addEventListener("resize", updateScrollState);

		return () => {
			viewport.removeEventListener("scroll", updateScrollState);
			window.removeEventListener("resize", updateScrollState);
		};
	}, [label, options.length]);

	const scrollPeriods = (direction) => {
		const viewport = viewportRef.current;

		if (viewport === null) {
			return;
		}

		viewport.scrollBy({ left: viewport.clientWidth * SCROLL_DISTANCE_FACTOR * direction, behavior: "smooth" });
	};

	return (
		<div className={selectorClassName} aria-label={label}>
			{scrollState.hasOverflow && (
				<button type="button" className="statistics-period-scroll-button" aria-label={previousLabel} disabled={!scrollState.canScrollPrevious} onClick={() => scrollPeriods(-1)}>
					<ChevronLeft aria-hidden="true" focusable="false" />
				</button>
			)}
			<div ref={viewportRef} className="statistics-period-viewport">
				<div className="statistics-period-selector-options">
					{options.map((option) => (
						<button key={option.key} type="button" className="statistics-period-selector-button" aria-pressed={selectedPeriod === option.key} onClick={() => onSelectPeriod(option.key)}>
							{option.label}
						</button>
					))}
				</div>
			</div>
			{scrollState.hasOverflow && (
				<button type="button" className="statistics-period-scroll-button" aria-label={nextLabel} disabled={!scrollState.canScrollNext} onClick={() => scrollPeriods(1)}>
					<ChevronRight aria-hidden="true" focusable="false" />
				</button>
			)}
		</div>
	);
}
