// src/ui/view/components/Search/SearchFilterControl.jsx
import { ChevronDown, Funnel } from "lucide-react";

export default function SearchFilterControl({
	label,
	ariaLabel,
	isOpen,
	onOpen
}) {
	return (
		<>
			<span className="search-filter-control-divider" aria-hidden="true" />

			<div className="search-filter-control">
				<Funnel className="search-filter-control-icon" aria-hidden="true" />
				<span className="search-filter-control-label" aria-hidden="true">
					{label}
				</span>
				<button
					type="button"
					className="search-filter-control-button"
					onClick={onOpen}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-label={ariaLabel}
				/>
				<ChevronDown className="search-filter-control-chevron" aria-hidden="true" />
			</div>
		</>
	);
}
