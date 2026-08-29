// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailSheet.jsx
import { useCallback } from "react";
import { BookOpen } from "lucide-react";
import isEditableTarget from "../../../KeyboardNavigation/isEditableTarget.js";
import useKeyboardShortcuts, { isShortcutEvent } from "../../../KeyboardNavigation/useKeyboardShortcuts.js";
import FormattedText from "../../Shared/FormattedText.jsx";
import GlossaryDetailModalContent from "./GlossaryDetailModalContent.jsx";
import GlossaryDetailHeader from "./GlossaryDetailHeader.jsx";
import GlossaryDetailNavigation from "./GlossaryDetailNavigation.jsx";

export default function GlossaryDetailSheet({ model }) {
	const handleGlossaryKeyboardNavigation = useCallback((event) => {
		if (!isShortcutEvent(event) || isEditableTarget(event.target)) {
			return;
		}

		if (event.key === "ArrowLeft" && !model.navigation.previous.isDisabled) {
			event.preventDefault();
			model.navigation.previous.onActivate();
			return;
		}

		if (event.key === "ArrowRight" && !model.navigation.next.isDisabled) {
			event.preventDefault();
			model.navigation.next.onActivate();
		}
	}, [
		model.navigation.next.isDisabled,
		model.navigation.next.onActivate,
		model.navigation.previous.isDisabled,
		model.navigation.previous.onActivate
	]);

	useKeyboardShortcuts({
		isEnabled: model.isInteractive,
		onKeyDown: handleGlossaryKeyboardNavigation
	});

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

				<GlossaryDetailModalContent model={model} />
			</div>

			<GlossaryDetailNavigation model={model.navigation} />
		</div>
	);
}
