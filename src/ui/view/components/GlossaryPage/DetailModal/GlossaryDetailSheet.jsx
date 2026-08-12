// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailSheet.jsx
import { BookOpen, Link2 } from "lucide-react";
import FormattedText from "../../Shared/FormattedText.jsx";
import GlossaryDetailHeader from "./GlossaryDetailHeader.jsx";
import GlossaryDetailNavigation from "./GlossaryDetailNavigation.jsx";
import GlossaryDetailNetworkSection from "./GlossaryDetailNetworkSection.jsx";

export default function GlossaryDetailSheet({ model }) {
	return (
		<div className="glossary-detail-modal__sheet" inert={!model.isInteractive}>
			<GlossaryDetailHeader model={model.header} />

			<div className="glossary-detail-modal__body">
				<section className="glossary-detail-modal__explanation">
					<h3 className="glossary-detail-modal__section-heading">
						<BookOpen size={21} strokeWidth={1.9} aria-hidden="true" />
						<span>{model.explanation.heading}</span>
					</h3>
					<div className="glossary-detail-modal__explanation-content">
						<FormattedText text={model.explanation.text} />
					</div>
				</section>

				<GlossaryDetailNetworkSection model={model.network} />

				<section className="glossary-detail-modal__associations">
					<h3 className="glossary-detail-modal__section-heading">
						<Link2 size={20} strokeWidth={1.9} aria-hidden="true" />
						<span>{model.associations.heading}</span>
					</h3>

					{model.associations.items.length === 0 ? (
						<p className="glossary-detail-modal__associations-empty">{model.associations.emptyLabel}</p>
					) : (
						<div className="glossary-detail-modal__association-list">
							{model.associations.items.map((item) => (
								<button key={item.glossaryEntryKey} type="button" className="glossary-detail-modal__association" onClick={item.onActivate}>
									{item.label}
								</button>
							))}
						</div>
					)}
				</section>
			</div>

			<GlossaryDetailNavigation model={model.navigation} />
		</div>
	);
}
