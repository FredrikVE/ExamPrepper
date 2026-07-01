// src/ui/view/components/Header/HeaderTitle.jsx
export default function HeaderTitle(props) {
    return (
        <div className="scaffold-header-title">
            {props.eyebrow && <p className="scaffold-header-title__eyebrow">{props.eyebrow}</p>}
            {props.title && <h1 className="scaffold-header-title__title">{props.title}</h1>}
            {props.subtitle && <p className="scaffold-header-title__subtitle">{props.subtitle}</p>}
            {props.children}
        </div>
    );
}
