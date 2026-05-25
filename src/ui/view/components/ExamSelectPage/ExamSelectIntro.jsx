//src/ui/view/components/ExamSelectPage/ExamSelectIntro.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamSelectIntro() {
    const { t } = useLanguage();

    return (
        <section className="exam-select-intro" aria-label={t.selectTitle}>
            <p className="exam-select-subtitle">
                {t.selectSubtitle}
            </p>
        </section>
    );
}