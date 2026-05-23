//src/ui/view/components/ExamFooter/FooterNavigationButton.jsx
export default function FooterNavigationButton({ onClick, disabled, variant, icon, children }) {
	const variantClassName = getFooterButtonVariantClassName(variant);
	const showIconLeft = variant === "previous";
	const showIconRight = variant === "next";

	return (
		<button
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

	return "exam-footer-button-next";
}