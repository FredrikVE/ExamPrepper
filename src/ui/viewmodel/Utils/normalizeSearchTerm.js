export default function normalizeSearchTerm(searchTerm) {
	if (typeof searchTerm !== "string") {
		throw new TypeError("normalizeSearchTerm requires a string");
	}

	return searchTerm.trim().toLowerCase();
}
