// src/ui/view/components/ExamPage/ExamPageState.jsx
export default function ExamPageState({ children }) {
    return (
        <div className="exam-workspace">
            <div className="exam-page-state">
                {children}
            </div>
        </div>
    );
}