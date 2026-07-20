// src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanelHeading.jsx
import { BookOpen } from "lucide-react";

export default function GlossaryPanelHeading({ heading }) {
	return (
		<header className="glossary-panel-heading">
			<div className="glossary-panel-heading__icon" aria-hidden="true">
				<BookOpen focusable="false" />
			</div>

			<div className="glossary-panel-heading__copy">
				<h2>{heading.title}</h2>
				<p>{heading.subtitle}</p>
			</div>
		</header>
	);
}
