//src/ui/view/components/ExamSelectPage/ExamSelectHero.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamSelectHero() {
    const { t } = useLanguage();

    return (
        <section className="exam-select-hero" aria-labelledby="exam-select-title">
            <h1 id="exam-select-title" className="exam-select-title">
                {t.selectHeroTitle}
            </h1>

            <p className="exam-select-subtitle">
                {t.selectSubtitle}
            </p>
        </section>
    );
}