// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenuHeader.jsx
import { X } from "lucide-react";

export default function FlipcardToolMenuHeader({ title, subtitle, progressLabel, closeLabel, onClose }) {
    return (
        <header className="flipcard-tool-menu-header">
            <div className="flipcard-tool-menu-heading-row">
                <div>
                    <p>{subtitle}</p>
                    <h2>{title}</h2>
                </div>

                {onClose && (
                    <button
                        type="button"
                        className="flipcard-tool-menu-close"
                        aria-label={closeLabel}
                        onClick={onClose}
                    >
                        <X aria-hidden="true" focusable="false" />
                    </button>
                )}
            </div>
            <strong>{progressLabel}</strong>
        </header>
    );
}
