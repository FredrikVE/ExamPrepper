// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailHeader.jsx
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, X } from "lucide-react";

export default function GlossaryDetailHeader({ model }) {
	return (
		<header className="glossary-detail-modal__header">
			<div className="glossary-detail-modal__header-main">
				<Dialog.Title
					className="glossary-detail-modal__title"
					ref={model.titleRef}
					tabIndex={-1}
				>
					{model.title}
				</Dialog.Title>

				<Dialog.Description className="glossary-detail-modal__subtitle">
					{model.subtitle}
				</Dialog.Description>

				{model.trailBack !== null ? (
					<button
						type="button"
						className="glossary-detail-modal__trail-back"
						onClick={model.trailBack.onActivate}
					>
						<ChevronLeft className="glossary-detail-modal__trail-back-icon" aria-hidden="true" />
						<span>{model.trailBack.label}</span>
					</button>
				) : null}
			</div>

			<Dialog.Close
				className="glossary-detail-modal__close"
				aria-label={model.closeLabel}
			>
				<X className="glossary-detail-modal__close-icon" aria-hidden="true" />
			</Dialog.Close>
		</header>
	);
}
