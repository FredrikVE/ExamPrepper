// src/ui/view/components/StatisticsPage/Overview/Chapters/StatisticsChapterOverview.jsx
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import WorkspaceState from "../../../WorkspaceState/WorkspaceState.jsx";
import { WORKSPACE_STATE_SCOPES } from "../../../WorkspaceState/workspaceStateVariants.js";
import StatisticsChapterCard from "./Cards/StatisticsChapterCard.jsx";

const SCROLL_EDGE_TOLERANCE_PX = 2;
const FIRST_SCROLL_POSITION = 0;

export default function StatisticsChapterOverview({ model, state, onSelectScope }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [scrollState, setScrollState] = useState({ hasOverflow: false, canScrollPrevious: false, canScrollNext: false });
	const viewportRef = useRef(null);
	const toggleRef = useRef(null);
	let sectionClassName = "statistics-chapter-overview";
	let carouselClassName = "statistics-chapter-carousel";
	let viewportTabIndex = 0;
	let toggleLabel = model.showAllLabel;

	if (!scrollState.hasOverflow) {
		carouselClassName += " statistics-chapter-carousel-static";
	}

	if (isExpanded) {
		sectionClassName += " statistics-chapter-overview-expanded";
		viewportTabIndex = -1;
		toggleLabel = model.showLessLabel;
	}

	useEffect(() => {
		const viewport = viewportRef.current;

		if (viewport === null || isExpanded) {
			setScrollState({ hasOverflow: false, canScrollPrevious: false, canScrollNext: false });
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
	}, [isExpanded, model.items.length]);

	const scrollChapters = (direction) => {
		const viewport = viewportRef.current;

		if (viewport === null) {
			return;
		}

		const firstCard = viewport.querySelector(".statistics-chapter-card");
		let scrollDistance = viewport.clientWidth;

		if (firstCard !== null) {
			const track = firstCard.parentElement;
			let gap = FIRST_SCROLL_POSITION;

			if (track !== null) {
				gap = Number.parseFloat(window.getComputedStyle(track).columnGap);

				if (!Number.isFinite(gap)) {
					gap = FIRST_SCROLL_POSITION;
				}
			}

			scrollDistance = firstCard.getBoundingClientRect().width + gap;
		}

		viewport.scrollBy({ left: scrollDistance * direction, behavior: "smooth" });
	};

	const collapseChapters = () => {
		setIsExpanded(false);

		const viewport = viewportRef.current;

		if (viewport !== null) {
			viewport.scrollTo({ left: FIRST_SCROLL_POSITION, behavior: "smooth" });
		}

		requestAnimationFrame(() => {
			const toggle = toggleRef.current;

			if (toggle !== null) {
				toggle.focus({ preventScroll: true });
			}
		});
	};

	const toggleExpanded = () => {
		if (isExpanded) {
			collapseChapters();
			return;
		}

		setIsExpanded(true);
	};

	const handleViewportKeyDown = (event) => {
		if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollChapters(1);
			return;
		}

		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollChapters(-1);
			return;
		}

		const viewport = viewportRef.current;

		if (viewport === null) {
			return;
		}

		if (event.key === "Home") {
			event.preventDefault();
			viewport.scrollTo({ left: FIRST_SCROLL_POSITION, behavior: "smooth" });
			return;
		}

		if (event.key === "End") {
			event.preventDefault();
			viewport.scrollTo({ left: viewport.scrollWidth, behavior: "smooth" });
		}
	};

	const handleSectionKeyDown = (event) => {
		if (event.key === "Escape" && isExpanded) {
			event.preventDefault();
			collapseChapters();
		}
	};

	return (
		<section className={sectionClassName} aria-label={model.title} onKeyDown={handleSectionKeyDown}>
			<WorkspaceState scope={WORKSPACE_STATE_SCOPES.EMBEDDED} state={state} emptyIcon={<FileText />}>
				<header className="statistics-overview-section-header">
					<div>
						<h2 id="statistics-chapters-title">{model.title}</h2>
						<p>{model.subtitle}</p>
					</div>
				</header>

				<div className={carouselClassName}>
					{scrollState.hasOverflow && (
						<button type="button" className="statistics-chapter-scroll-button" aria-label={model.previousLabel} disabled={!scrollState.canScrollPrevious} onClick={() => scrollChapters(-1)}>
							<ChevronLeft aria-hidden="true" focusable="false" />
						</button>
					)}
					<div ref={viewportRef} className="statistics-chapter-viewport" tabIndex={viewportTabIndex} aria-label={model.carouselLabel} onKeyDown={handleViewportKeyDown}>
						<div className="statistics-chapter-track">
							{model.items.map((chapter) => <StatisticsChapterCard key={chapter.key} model={chapter} onSelect={onSelectScope} />)}
						</div>
					</div>
					{scrollState.hasOverflow && (
						<button type="button" className="statistics-chapter-scroll-button" aria-label={model.nextLabel} disabled={!scrollState.canScrollNext} onClick={() => scrollChapters(1)}>
							<ChevronRight aria-hidden="true" focusable="false" />
						</button>
					)}
				</div>

				{model.items.length > 0 && (
					<button ref={toggleRef} type="button" className="statistics-chapter-toggle" aria-expanded={isExpanded} onClick={toggleExpanded}>
						<span>{toggleLabel}</span>
						<ChevronDown aria-hidden="true" focusable="false" />
					</button>
				)}
			</WorkspaceState>
		</section>
	);
}
