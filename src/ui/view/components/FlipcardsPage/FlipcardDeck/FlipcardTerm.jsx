// src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardTerm.jsx
export default function FlipcardTerm({ className, presentation }) {
	if (presentation.parentheticalText === null) {
		return <span className={className}>{presentation.primaryText}</span>;
	}

	return (
		<span className={className}>
			<span className="flipcard-term-primary">{presentation.primaryText}</span>{" "}
			<span className="flipcard-term-parenthetical">{presentation.parentheticalText}</span>
		</span>
	);
}
