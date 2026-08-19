// src/ui/view/components/LearningPathPage/LearningPathSessionConflictDialog.jsx
import { Dialog } from "@base-ui/react/dialog";

export default function LearningPathSessionConflictDialog({ model }) {
	return (
		<Dialog.Root open={model.isOpen} onOpenChange={(isOpen) => { if (!isOpen) model.onClose(); }}>
			<Dialog.Portal>
				<Dialog.Backdrop className="learning-path-conflict-dialog__backdrop" />
				<Dialog.Viewport className="learning-path-conflict-dialog__viewport">
					<Dialog.Popup className="learning-path-conflict-dialog__popup">
						<Dialog.Title className="learning-path-conflict-dialog__title">{model.title}</Dialog.Title>
						<Dialog.Description className="learning-path-conflict-dialog__body">{model.body}</Dialog.Description>
						<div className="learning-path-conflict-dialog__actions">
							<button type="button" className="learning-path-conflict-dialog__secondary" onClick={model.onContinue}>{model.continueLabel}</button>
							<button type="button" className="learning-path-conflict-dialog__primary" onClick={model.onDiscard}>{model.discardLabel}</button>
							<Dialog.Close className="learning-path-conflict-dialog__cancel">{model.cancelLabel}</Dialog.Close>
						</div>
					</Dialog.Popup>
				</Dialog.Viewport>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
