// src/ui/view/components/ExamPage/ExamToolbar.jsx
import ExamToolbarActions from "./ExamToolbarActions.jsx";

export default function ExamToolbar({ viewModel }) {
    return (
        <header className="exam-header">
            <div className="exam-header-container">
                <div className="exam-header-layout">
                    <ExamToolbarActions viewModel={viewModel} />
                </div>
            </div>
        </header>
    );
}
