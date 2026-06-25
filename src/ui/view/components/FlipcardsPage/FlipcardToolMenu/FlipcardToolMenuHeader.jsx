// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenuHeader.jsx
export default function FlipcardToolMenuHeader({ title, subtitle, progressLabel }) {
    return (
        <header className="flipcard-tool-menu-header">
            <div>
                <p>{subtitle}</p>
                <h2>{title}</h2>
            </div>
            <strong>{progressLabel}</strong>
        </header>
    );
}
