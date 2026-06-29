// src/ui/view/components/Footer/Footer.jsx
export default function Footer({ previousButton, counter, actionButton }) {
    return (
        <footer className="exam-footer">
            <div className="exam-footer-container">
                {previousButton}

                <div className="exam-footer-counter">
                    {counter}
                </div>

                {actionButton}
            </div>
        </footer>
    );
}
