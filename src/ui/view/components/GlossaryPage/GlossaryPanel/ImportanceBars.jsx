// src/ui/view/components/GlossaryPage/GlossaryPanel/ImportanceBars.jsx
const IMPORTANCE_BAR_INDEXES = Object.freeze([0, 1, 2, 3]);

export default function ImportanceBars({ model }) {
	return (
		<span className="glossary-importance-bars">
			<span className="glossary-importance-bars__visual" aria-hidden="true">
				<span className="glossary-importance-bars__value">{model.value}</span>
				<span className="glossary-importance-bars__meter">
					{IMPORTANCE_BAR_INDEXES.map((index) => (
						<span key={index} className={getImportanceBarClassName(index, model.level)} />
					))}
				</span>
			</span>
			<span className="sr-only">{model.ariaLabel}</span>
		</span>
	);
}

function getImportanceBarClassName(index, level) {
	return index < level
		? "glossary-importance-bars__bar glossary-importance-bars__bar--filled"
		: "glossary-importance-bars__bar";
}
