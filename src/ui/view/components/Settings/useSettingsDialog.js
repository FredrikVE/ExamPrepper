// src/ui/view/components/Settings/useSettingsDialog.js
import { useCallback, useEffect, useRef } from "react";

export default function useSettingsDialog(isOpen, onClose) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleBackdropClick = useCallback((event) => {
        if (event.target === dialogRef.current) {
            handleClose();
        }
    }, [handleClose]);

    return {
        dialogRef,
        handleClose,
        handleBackdropClick
    };
}
