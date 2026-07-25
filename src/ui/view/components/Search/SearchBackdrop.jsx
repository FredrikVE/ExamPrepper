// src/ui/view/components/Search/SearchBackdrop.jsx
export default function SearchBackdrop({ isOpen, closeLabel, onClose }) {
	if (!isOpen) {
		return null;
	}

	return (
		<button
			type="button"
			className="search-backdrop search-backdrop-visible"
			onMouseDown={(event) => {
				event.preventDefault();
			}}
			onClick={onClose}
			aria-label={closeLabel}
			tabIndex={-1}
		/>
	);
}
