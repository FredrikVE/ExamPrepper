// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaListItem.jsx
import { BookOpen, Check } from "lucide-react";

export default function TopicAreaListItem({ item }) {
	return (
		<>
			<BookOpen className="glossary-topic-area-item__icon" aria-hidden="true" focusable="false" />

			<span className="glossary-topic-area-item__copy">
				{item.eyebrow ? (
					<span className="glossary-topic-area-item__eyebrow">{item.eyebrow}</span>
				) : null}
				<span className="glossary-topic-area-item__label">{item.label}</span>
				<span className="glossary-topic-area-item__subtitle">{item.subtitle}</span>
				{item.matchCountLabel ? (
					<span className="glossary-topic-area-item__match-count">{item.matchCountLabel}</span>
				) : null}
			</span>

			<span className="glossary-topic-area-item__count" aria-hidden="true">
				{item.entryCount}
			</span>

			{item.showsSelectionControl ? (
				<span
					className="glossary-topic-area-item__selection-control"
					data-selected={item.isSelected ? "true" : "false"}
					aria-hidden="true"
				>
					{item.isSelected ? <Check focusable="false" /> : null}
				</span>
			) : null}
		</>
	);
}
