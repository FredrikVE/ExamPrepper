// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailModal.jsx
import { Dialog } from "@base-ui/react/dialog";
import GlossaryDetailSheet from "./GlossaryDetailSheet.jsx";

export default function GlossaryDetailModal({ model }) {
	return (
		<Dialog.Root open={model.isOpen} onOpenChange={model.onOpenChange} onOpenChangeComplete={model.onOpenChangeComplete}>
			<Dialog.Portal>
				<Dialog.Backdrop className="glossary-detail-modal__backdrop" />

				<Dialog.Viewport className="glossary-detail-modal__viewport">
					<Dialog.Popup className="glossary-detail-modal__popup" initialFocus={model.initialFocus} finalFocus={model.finalFocus}>
						{model.content !== null ? <GlossaryDetailSheet model={model.content} /> : null}
					</Dialog.Popup>
				</Dialog.Viewport>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
