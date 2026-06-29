// src/ui/view/components/ProgressPager/ProgressPager.jsx
export default function ProgressPager({ previousButton, counter, actionButton }) {
    return (
        <footer className="progress-pager">
            <div className="progress-pager-container">
                {previousButton}

                <div className="progress-pager-counter">
                    {counter}
                </div>

                {actionButton}
            </div>
        </footer>
    );
}
