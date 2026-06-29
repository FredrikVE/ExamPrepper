// src/ui/view/components/ProgressPager/PagerButton.jsx
export default function PagerButton({ onClick, disabled, variant, icon, children, className = "" }) {
    const variantClassName = getPagerButtonVariantClassName(variant);
    const showIconLeft = variant === "previous";
    const showIconRight = variant === "next";

    const buttonClassName = `progress-pager-button ${variantClassName} ${className}`.trim();

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={buttonClassName}
        >
            {showIconLeft && icon}
            {children}
            {showIconRight && icon}
        </button>
    );
}

function getPagerButtonVariantClassName(variant) {
    if (variant === "previous") {
        return "progress-pager-button-previous";
    }

    return "progress-pager-button-next";
}
