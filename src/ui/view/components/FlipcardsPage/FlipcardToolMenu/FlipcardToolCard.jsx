// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolCard.jsx
export default function FlipcardToolCard({
    variant,
    icon: Icon,
    label,
    description,
    disabled,
    onClick
}) {
    return (
        <button
            type="button"
            className={`flipcard-tool-card flipcard-tool-card-${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="flipcard-tool-card-icon" aria-hidden="true">
                <Icon aria-hidden="true" focusable="false" />
            </span>
            <span className="flipcard-tool-card-copy">
                <strong>{label}</strong>
                <span>{description}</span>
            </span>
        </button>
    );
}
