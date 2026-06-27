// src/ui/view/components/PageTools/PageToolsCard.jsx
import PageToolsIcon from "./PageToolsIcon.jsx";

export default function PageToolsCard(props) {
    const selectTool = () => {
        if (props.toolItem.isDisabled) {
            return;
        }

        props.onSelect(props.toolItem);
    };

    return (
        <button
            type="button"
            className={`page-tools-${props.surface}-card`}
            aria-label={props.toolItem.ariaLabel}
            disabled={props.toolItem.isDisabled}
            onClick={selectTool}
        >
            <PageToolsIcon iconKey={props.toolItem.iconKey} />
            <span>{props.toolItem.label}</span>
            {props.toolItem.statusLabel && <small>{props.toolItem.statusLabel}</small>}
        </button>
    );
}
