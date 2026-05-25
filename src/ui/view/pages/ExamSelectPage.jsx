//src/ui/view/pages/ExamSelectPage.jsx
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";

export default function ExamSelectPage({ exams, onSelectExam }) {
    const { t } = useLanguage();

    return (
        <main className="exam-select-workspace">
            <div className="exam-select-ambient-light" aria-hidden="true" />

            <ExamSelectTopbar />

            <ExamSelectIntro />

            <ExamSelectGrid
                exams={exams}
                t={t}
                onSelectExam={onSelectExam}
            />
        </main>
    );
}