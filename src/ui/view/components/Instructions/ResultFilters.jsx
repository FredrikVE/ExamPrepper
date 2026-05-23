//src/ui/view/components/Instructions/ResultFilters.jsx
const FILTERS = [
	["all", "Alle"],
	["wrong", "Kun feil"],
	["right", "Kun riktige"]
];

export default function ResultFilters({ activeFilter, onChangeFilter }) {
	return (
		<div className="exam-instructions-filter-list">
			{FILTERS.map(([key, label]) => (
				<button
					key={key}
					onClick={() => onChangeFilter(key)}
					className={`exam-instructions-filter-button ${getFilterButtonClassName(
						key,
						activeFilter
					)}`}
				>
					{label}
				</button>
			))}
		</div>
	);
}

function getFilterButtonClassName(key, activeFilter) {
	if (key === activeFilter) {
		return "exam-instructions-filter-button-active";
	}

	return "exam-instructions-filter-button-inactive";
}