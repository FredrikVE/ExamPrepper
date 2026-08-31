// src/ui/view/components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx
import Footer from "../../Footer/Footer.jsx";
import GlossarySearchPanel, { GlossarySearchPopup } from "../GlossarySearchPanel.jsx";

export default function GlossaryFooter({ search }) {
	return (
		<Footer
			isOpen={search.isPopupOpen}
			className="glossary-search-footer"
			openClassName="glossary-search-footer--popup-open"
		>
			<div className="glossary-search-footer__content">
				<GlossarySearchPopup search={search} />

				<div className="glossary-search-footer__controls">
					<GlossarySearchPanel
						search={search}
						descriptionId="glossary-search-meta"
						keyboardHint={search.keyboardHint}
					/>
				</div>
			</div>
		</Footer>
	);
}
