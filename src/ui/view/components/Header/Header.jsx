// src/ui/view/components/Header/Header.jsx
import HeaderActions from "./HeaderActions.jsx";

export default function Header({ viewModel }) {
    return (
        <header className="exam-header">
            <div className="exam-header-container">
                <div className="exam-header-layout">
                    <HeaderActions viewModel={viewModel} />
                </div>
            </div>
        </header>
    );
}