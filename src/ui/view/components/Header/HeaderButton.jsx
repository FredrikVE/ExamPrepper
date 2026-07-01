// src/ui/view/components/Header/HeaderButton.jsx
export default function HeaderButton(props) {
    const className = ["scaffold-header-button", props.className].filter(Boolean).join(" ");

    return (
        <button
            type={props.type ?? "button"}
            className={className}
            onClick={props.onClick}
            aria-label={props.ariaLabel}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}
