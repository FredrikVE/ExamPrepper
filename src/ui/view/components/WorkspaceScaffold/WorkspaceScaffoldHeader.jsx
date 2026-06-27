// src/ui/view/components/WorkspaceScaffold/WorkspaceScaffoldHeader.jsx
import { ChevronLeft } from "lucide-react";
import PageToolsDesktopPanel from "../PageTools/PageToolsDesktopPanel.jsx";

export default function WorkspaceScaffoldHeader(props) {
    return (
        <header className="workspace-scaffold-header" aria-label={props.navigationLabel}>
            {props.showBackButton && (
                <button
                    type="button"
                    className="workspace-scaffold-header-button workspace-scaffold-back-button"
                    onClick={props.onBack}
                    aria-label={props.backLabel}
                >
                    <ChevronLeft aria-hidden="true" focusable="false" />
                </button>
            )}

            <PageToolsDesktopPanel tools={props.tools} />
        </header>
    );
}
