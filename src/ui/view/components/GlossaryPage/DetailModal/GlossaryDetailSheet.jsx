// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailSheet.jsx
import { BookOpen } from "lucide-react";
import FormattedText from "../../Shared/FormattedText.jsx";
import GlossaryDetailContent from "./GlossaryDetailContent.jsx";
import GlossaryDetailHeader from "./GlossaryDetailHeader.jsx";
import GlossaryDetailNavigation from "./GlossaryDetailNavigation.jsx";

export default function GlossaryDetailSheet({ model }) {
	return (
		<div className="glossary-detail-modal__sheet" inert={!model.isInteractive}>
			<GlossaryDetailHeader model={model.header} />

			<div className="glossary-detail-modal__body">
				<section className="glossary-detail-modal__explanation">
					<h3 className="glossary-detail__section-heading">
						<BookOpen size={21} strokeWidth={1.9} aria-hidden="true" />
						<span>{model.explanation.heading}</span>
					</h3>
					<div className="glossary-detail-modal__explanation-content">
						<FormattedText text={model.explanation.text} />
					</div>
				</section>

				<GlossaryDetailContent model={model} isInteractive={model.isInteractive} />
			</div>

			<GlossaryDetailNavigation model={model.navigation} />
		</div>
	);
}
