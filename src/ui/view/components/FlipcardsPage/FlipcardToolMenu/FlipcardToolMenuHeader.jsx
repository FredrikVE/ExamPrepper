// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenuHeader.jsx
import { X } from "lucide-react";

export default function FlipcardToolMenuHeader({
    title,
    subtitle,
    progressLabel,
    closeLabel,
    onClose,
    closeComponent: CloseComponent = "button"
}) {
    return (
        <header className="flipcard-tool-menu-header">
            <div className="flipcard-tool-menu-heading-row">
                <div>
                    <p>{subtitle}</p>
                    <h2>{title}</h2>
                </div>

                {onClose && (
                    <CloseComponent
                        type="button"
                        className="flipcard-tool-menu-close"
                        aria-label={closeLabel}
                        onClick={onClose}
                    >
                        <X aria-hidden="true" focusable="false" />
                    </CloseComponent>
                )}
            </div>
            <strong>{progressLabel}</strong>
        </header>
    );
}
