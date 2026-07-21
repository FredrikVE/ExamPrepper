// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx
import { Search, X } from "lucide-react";

const SEARCH_META_ID = "glossary-search-meta";

export default function GlossarySearchField({ model, actions }) {
	const handleKeyDown = (event) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			actions.onMoveSearchSelectionDown();
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			actions.onMoveSearchSelectionUp();
			return;
		}

		if (event.key === "Enter") {
			event.preventDefault();
			actions.onOpenSearchKeyboardSelection();
			return;
		}

		if (event.key === "Escape" && model.isSearching) {
			event.preventDefault();
			actions.onClearSearch();
		}
	};

	const searchInput = model.input.kind === "combobox" ? (
		<input
			className="glossary-search-field__input"
			type="search"
			value={model.term}
			placeholder={model.placeholder}
			aria-label={model.placeholder}
			aria-describedby={SEARCH_META_ID}
			role="combobox"
			aria-expanded={model.input.isExpanded}
			aria-controls={model.input.controlledListId}
			aria-activedescendant={model.input.activeDescendantId}
			aria-autocomplete="list"
			autoComplete="off"
			onChange={(event) => actions.onSearchTermChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	) : (
		<input
			className="glossary-search-field__input"
			type="search"
			value={model.term}
			placeholder={model.placeholder}
			aria-label={model.placeholder}
			aria-describedby={SEARCH_META_ID}
			autoComplete="off"
			onChange={(event) => actions.onSearchTermChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	);

	return (
		<div className={model.isSearching ? "glossary-search-control glossary-search-control--active" : "glossary-search-control"}>
			<label className="glossary-search-field">
				<Search className="glossary-search-field__icon" aria-hidden="true" focusable="false" />
				{searchInput}

				{model.isSearching ? (
					<button
						className="glossary-search-field__clear"
						type="button"
						aria-label={model.clearLabel}
						onClick={actions.onClearSearch}
					>
						<X aria-hidden="true" focusable="false" />
					</button>
				) : null}
			</label>

			<div id={SEARCH_META_ID} className="glossary-search-meta" aria-live="polite">
				<span>{model.summaryLabel}</span>
				{model.isSearching ? <span>{model.keyboardHint}</span> : null}
			</div>
		</div>
	);
}
