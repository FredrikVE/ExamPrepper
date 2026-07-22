// src/ui/view/components/Search/SearchField.jsx
import { Search } from "lucide-react";

export default function SearchField({ className, trailingContent, children }) {
	return (
		<div className={`search-field ${className}`}>
			<div className="search-field-main">
				<Search className="search-field-icon" aria-hidden="true" focusable="false" />
				{children}
			</div>

			{trailingContent}
		</div>
	);
}
