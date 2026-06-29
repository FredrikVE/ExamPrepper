// src/ui/view/components/ProgressPager/ProgressPager.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import PagerButton from "./PagerButton.jsx";
import ProgressDots from "./ProgressDots.jsx";

export default function ProgressPager(props) {
    const pagerClassName = `progress-pager ${props.className}`.trim();
    const progressPagerContainerClassName = `progress-pager-container ${props.containerClassName}`.trim();
    const progressPagerCounterClassName = `progress-pager-counter ${props.counterClassName}`.trim();

    return (
        <footer className={pagerClassName} aria-label={props.ariaLabel}>
            <div className={progressPagerContainerClassName}>
                <PagerButton
                    onClick={props.onPrevious}
                    disabled={props.previousDisabled}
                    variant="previous"
                    icon={<ChevronLeft className="progress-pager-icon" aria-hidden="true" focusable="false" />}
                    className={props.previousButtonClassName}
                >
                    {props.previousLabel}
                </PagerButton>

                <div className={progressPagerCounterClassName}>
                    <ProgressDots
                        entries={props.entries}
                        compactEntries={props.compactEntries}
                        minimalCompactEntries={props.minimalCompactEntries}
                        shouldUseCompactDots={props.shouldUseCompactDots}
                        shouldUseResponsiveCompactDots={props.shouldUseResponsiveCompactDots}
                        submitted={props.submitted}
                        onSelectEntry={props.onSelectEntry}
                        dotsLabel={props.dotsLabel}
                        goToEntryLabel={props.goToEntryLabel}
                    />

                    <span className={props.counterLabelClassName}>
                        {props.counterLabel}
                    </span>
                </div>

                {props.hasActionButton ? props.actionButton : (
                    <PagerButton
                        onClick={props.onNext}
                        disabled={props.nextDisabled}
                        variant="next"
                        icon={<ChevronRight className="progress-pager-icon" aria-hidden="true" focusable="false" />}
                        className={props.nextButtonClassName}
                    >
                        {props.nextLabel}
                    </PagerButton>
                )}
            </div>
        </footer>
    );
}