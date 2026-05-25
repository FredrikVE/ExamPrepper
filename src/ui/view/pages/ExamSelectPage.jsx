//src/ui/view/pages/ExamSelectPage.jsx
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectHero from "../components/ExamSelectPage/ExamSelectHero.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";

export default function ExamSelectPage({ exams, onSelectExam }) {
    const { t } = useLanguage();

    return (
        <main className="exam-select-workspace">
            <div className="exam-select-ambient-light" aria-hidden="true" />

            <ExamSelectTopbar />

            <ExamSelectHero />

            <ExamSelectGrid
                exams={exams}
                t={t}
                onSelectExam={onSelectExam}
            />
        </main>
    );
}