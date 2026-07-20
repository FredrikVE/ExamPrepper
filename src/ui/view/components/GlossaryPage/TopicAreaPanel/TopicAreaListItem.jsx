// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaListItem.jsx
import { BookOpen } from "lucide-react";

export default function TopicAreaListItem({ item, usesOptionSemantics, onSelect }) {
	return (
		<button
			id={item.id}
			className={resolveTopicAreaListItemClassName(item)}
			type="button"
			role={usesOptionSemantics ? "option" : undefined}
			aria-selected={usesOptionSemantics ? item.isKeyboardTarget : undefined}
			aria-current={!usesOptionSemantics && item.isActive ? "true" : undefined}
			onClick={() => onSelect(item.topicAreaKey)}
		>
			<BookOpen className="glossary-topic-area-item__icon" aria-hidden="true" focusable="false" />

			<span className="glossary-topic-area-item__copy">
				<span className="glossary-topic-area-item__label">{item.label}</span>
				<span className="glossary-topic-area-item__subtitle">{item.subtitle}</span>
				{item.matchCountLabel ? (
					<span className="glossary-topic-area-item__match-count">{item.matchCountLabel}</span>
				) : null}
			</span>

			<span className="glossary-topic-area-item__count" aria-hidden="true">
				{item.entryCount}
			</span>
		</button>
	);
}

const resolveTopicAreaListItemClassName = (item) => {
	const classNames = ["glossary-topic-area-item"];

	if (item.isActive) {
		classNames.push("is-active");
	}

	if (item.isKeyboardTarget) {
		classNames.push("is-keyboard-target");
	}

	return classNames.join(" ");
};
