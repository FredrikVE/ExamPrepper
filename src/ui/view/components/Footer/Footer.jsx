// src/ui/view/components/Footer/Footer.jsx
export default function Footer(props) {
    const className = [
        "footer",
        props.isOpen ? "footer-open" : null,
        props.isOpen ? props.openClassName : null,
        props.className
    ].filter(Boolean).join(" ");

    return (
        <div className={className} onBlur={props.onBlur}>
            {props.children}
        </div>
    );
}
