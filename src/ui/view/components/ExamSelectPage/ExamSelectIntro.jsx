//src/ui/view/components/ExamSelectPage/ExamSelectIntro.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamSelectIntro() {
    const { t } = useLanguage();

    return (
        <section className="exam-select-intro" aria-labelledby="exam-select-title">
            <h1 id="exam-select-title" className="exam-select-title">
                {t.selectIntroTitle}
            </h1>

            <p className="exam-select-subtitle">
                {t.selectSubtitle}
            </p>
        </section>
    );
}