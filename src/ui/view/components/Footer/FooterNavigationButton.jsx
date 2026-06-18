// src/ui/view/components/Footer/FooterNavigationButton.jsx
export default function FooterNavigationButton({ onClick, disabled, variant, icon, children, className = "" }) {
    const variantClassName = getFooterButtonVariantClassName(variant);
    const showIconLeft = variant === "previous";
    const showIconRight = variant === "next" || variant === "submit";

    const buttonClassName = `exam-footer-button ${variantClassName} ${className}`.trim();

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

function getFooterButtonVariantClassName(variant) {
    if (variant === "previous") {
        return "exam-footer-button-previous";
    }

    if (variant === "submit") {
        return "exam-footer-button-submit";
    }

    return "exam-footer-button-next";
}