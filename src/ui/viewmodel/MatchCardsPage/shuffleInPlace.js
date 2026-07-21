// src/ui/viewmodel/MatchCardsPage/shuffleInPlace.js
export function shuffleInPlace(items, randomNumber) {
	for (let index = items.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(randomNumber() * (index + 1));
		const currentItem = items[index];

		items[index] = items[swapIndex];
		items[swapIndex] = currentItem;
	}

	return items;
}
