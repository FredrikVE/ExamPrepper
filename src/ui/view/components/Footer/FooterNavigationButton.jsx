// src/ui/view/components/Footer/FooterNavigationButton.jsx
export default function FooterNavigationButton({ onClick, disabled, variant, icon, children }) {
    const variantClassName = getFooterButtonVariantClassName(variant);
    const showIconLeft = variant === "previous";
    const showIconRight = variant === "next" || variant === "submit";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`exam-footer-button ${variantClassName}`}
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