// src/ui/view/components/ProgressPager/ProgressPager.jsx
export default function ProgressPager({ previousButton, counter, actionButton, className, containerClassName, ariaLabel }) {
    const pagerClassName = `progress-pager ${className}`.trim();
    const progressPagerContainerClassName = `progress-pager-container ${containerClassName}`.trim();

    return (
        <footer className={pagerClassName} aria-label={ariaLabel}>
            <div className={progressPagerContainerClassName}>
                {previousButton}

                <div className="progress-pager-counter">
                    {counter}
                </div>

                {actionButton}
            </div>
        </footer>
    );
}
