// src/ui/view/components/Shared/FilterOptionList.jsx
import { Check } from "lucide-react";

export default function FilterOptionList({ filterOptions, selectedFilterValue, onSelectFilterOption }) {
	if (filterOptions.length === 0) {
		return null;
	}

	return (
		<ul className="search-sheet-list search-sheet-list-filter-options" role="listbox">
			{filterOptions.map((filterOption) => {
				const isSelected = filterOption.value === selectedFilterValue;

				return (
					<li
						key={filterOption.id}
						role="option"
						aria-selected={isSelected}
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
							{isSelected && <Check className="search-sheet-row-icon" aria-hidden="true" />}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
