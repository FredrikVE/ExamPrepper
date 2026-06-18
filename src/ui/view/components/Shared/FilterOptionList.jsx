// src/ui/view/components/Shared/FilterOptionList.jsx
import { Funnel } from "lucide-react";

export default function FilterOptionList({ filterOptions, selectedFilterValue, onSelectFilterOption }) {
	if (filterOptions.length === 0) {
		return null;
	}

	return (
		<ul className="search-sheet-list search-sheet-list-filter-options" role="listbox">
			{filterOptions.map((filterOption) => (
				<li
					key={filterOption.id}
					role="option"
					aria-selected={filterOption.value === selectedFilterValue}
				>
					<button
						type="button"
						className="search-sheet-row search-sheet-row-filter-option"
						onMouseDown={(event) => {
							event.preventDefault();
						}}
						onClick={() => onSelectFilterOption(filterOption.value)}
					>
						<span className="search-sheet-row-label">{filterOption.label}</span>
						<Funnel className="search-sheet-row-icon" aria-hidden="true" />
					</button>
				</li>
			))}
		</ul>
	);
}
