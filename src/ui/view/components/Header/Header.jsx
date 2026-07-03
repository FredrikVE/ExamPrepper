// src/ui/view/components/Header/Header.jsx
import { ChevronLeft } from "lucide-react";
import PageToolsDesktopPanel from "../PageTools/PageToolsDesktopPanel.jsx";
import HeaderButton from "./HeaderButton.jsx";

export default function Header(props) {
    return (
        <header className="scaffold-header" aria-label={props.navigationLabel ?? undefined}>
            <div className="scaffold-header__leading">
                {props.showBackButton && (
                    <HeaderButton
                        className="scaffold-header__back-button"
                        onClick={props.onBack}
                        ariaLabel={props.backLabel}
                    >
                        <ChevronLeft aria-hidden="true" focusable="false" />
                    </HeaderButton>
                )}
            </div>

            {props.heading && <div className="scaffold-header__heading">{props.heading}</div>}

            <div className="scaffold-header__trailing">
                <PageToolsDesktopPanel tools={props.tools} />
                {props.trailing && <div className="scaffold-header__actions">{props.trailing}</div>}
            </div>
        </header>
    );
}
