// src/ui/view/components/WorkspaceScaffold/WorkspaceScaffoldSearchFooter.jsx
export default function WorkspaceScaffoldSearchFooter(props) {
    const className = [
        "workspace-scaffold-search-footer",
        props.isOpen ? "workspace-scaffold-search-footer-open" : null,
        props.className
    ].filter(Boolean).join(" ");

    return (
        <div className={className} onBlur={props.onBlur}>
            {props.children}
        </div>
    );
}
