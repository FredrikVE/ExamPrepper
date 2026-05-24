//src/ui/view/pages/ExamSelectPage.jsx
import { useState } from "react";
import {
    BarChart3,
    BookOpen,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    ClipboardList,
    Clock3,
    FileText,
    Home,
    PencilLine,
    Settings,
    ShieldCheck,
    Target,
    Trophy,
    TrendingUp
} from "lucide-react";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import SettingsMenu from "../components/Settings/SettingsMenu.jsx";

const CARD_TITLE_FALLBACKS = ["Full Review", "Deep Dive", "Application Focus"];

export default function ExamSelectPage({ exams, onSelectExam }) {
    const { t } = useLanguage();
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <div className="exam-select-page">
            <div className="exam-select-shell">
                <SelectSidebar
                    t={t}
                    settingsOpen={settingsOpen}
                    onOpenSettings={() => setSettingsOpen(true)}
                />

                <main className="exam-select-workspace">
                    <div className="exam-select-ambient-light" aria-hidden="true" />

                    <div className="exam-select-topbar">
                        <p className="exam-select-kicker">
                            {t.selectHeroKicker}
                        </p>

                        <button type="button" className="exam-select-statistics-button">
                            <Trophy className="exam-select-statistics-icon" />
                            <span>{t.selectStatistics}</span>
                            <ChevronRight className="exam-select-statistics-chevron" />
                        </button>
                    </div>

                    <section className="exam-select-hero" aria-labelledby="exam-select-title">
                        <h1 id="exam-select-title" className="exam-select-title">
                            {t.selectHeroTitle}
                        </h1>

                        <p className="exam-select-subtitle">
                            {t.selectSubtitle}
                        </p>
                    </section>

                    <section className="exam-select-grid" aria-label={t.selectTitle}>
                        {exams.map((exam, index) => (
                            <ExamSelectCard
                                key={exam.id}
                                exam={exam}
                                index={index}
                                t={t}
                                onSelectExam={onSelectExam}
                            />
                        ))}
                    </section>

                    <FeatureStrip t={t} />
                </main>

                <SettingsMenu
                    isOpen={settingsOpen}
                    onOpenChange={setSettingsOpen}
                />
            </div>
        </div>
    );
}

function SelectSidebar({ t, settingsOpen, onOpenSettings }) {
    const navItems = [
        { label: t.sidebarHome, icon: Home, active: true },
        { label: t.sidebarTask, icon: FileText },
        { label: t.sidebarOverview, icon: BarChart3 },
        { label: t.sidebarNotes, icon: PencilLine }
    ];

    return (
        <aside className="exam-select-sidebar" aria-label={t.sidebarLabel}>
            <div className="exam-select-brand">
                <div className="exam-select-brand-mark">
                    <ClipboardList className="exam-select-brand-icon" />
                </div>

                <div>
                    <p className="exam-select-brand-title">IN5431</p>
                    <p className="exam-select-brand-subtitle">Exam Emulator</p>
                </div>
            </div>

            <nav className="exam-select-sidebar-nav">
                {navItems.map(({ label, icon: Icon, active }) => (
                    <button
                        key={label}
                        type="button"
                        className={`exam-select-sidebar-item ${active ? "exam-select-sidebar-item-active" : ""}`}
                    >
                        <Icon className="exam-select-sidebar-icon" />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

            <div className="exam-select-sidebar-divider" />

            <button
                type="button"
                onClick={onOpenSettings}
                className={`exam-select-sidebar-item exam-select-settings-button ${settingsOpen ? "exam-select-sidebar-item-active" : ""}`}
                aria-controls="settings-panel"
                aria-expanded={settingsOpen}
            >
                <Settings className="exam-select-sidebar-icon" />
                <span>{t.sidebarSettings}</span>
            </button>

            <div className="exam-select-user-card">
                <div className="exam-select-user-avatar">HS</div>
                <div className="exam-select-user-copy">
                    <p className="exam-select-user-name">Hans Student</p>
                    <p className="exam-select-user-email">hans@student.no</p>
                </div>
                <ChevronDown className="exam-select-user-chevron" />
            </div>
        </aside>
    );
}

function ExamSelectCard({ exam, index, t, onSelectExam }) {
    const isRecommended = index === 0;
    const displayTitle = getDisplayTitle(exam, index);

    return (
        <button
            type="button"
            onClick={() => onSelectExam(exam.id)}
            className={`exam-select-card ${isRecommended ? "exam-select-card-recommended" : ""}`}
        >
            {isRecommended ? (
                <span className="exam-select-recommended-badge">
                    {t.selectRecommended}
                </span>
            ) : null}

            <div className="exam-select-card-main-row">
                <div className="exam-select-card-icon-wrapper">
                    <BookOpen className="exam-select-card-icon" />
                </div>

                <div className="exam-select-card-copy">
                    <p className="exam-select-card-eyebrow">
                        {t.selectPracticeExamLabel(index + 1)}
                    </p>

                    <h2 className="exam-select-card-title">
                        {displayTitle}
                    </h2>

                    <p className="exam-select-card-description">
                        {exam.description}
                    </p>
                </div>
            </div>

            <div className="exam-select-card-footer">
                <div className="exam-select-card-meta">
                    <CircleHelp className="exam-select-card-meta-icon" />
                    <div>
                        <strong>{exam.questionCount}</strong>
                        <span>{t.selectQuestionLabel}</span>
                    </div>
                </div>

                <div className="exam-select-card-footer-divider" aria-hidden="true" />

                <div className="exam-select-card-meta">
                    <Clock3 className="exam-select-card-meta-icon" />
                    <div>
                        <strong>45-60</strong>
                        <span>{t.selectMinuteLabel}</span>
                    </div>
                </div>

                <span className="exam-select-card-arrow" aria-hidden="true">
                    <ChevronRight className="exam-select-card-arrow-icon" />
                </span>
            </div>
        </button>
    );
}

function FeatureStrip({ t }) {
    const features = [
        { icon: BarChart3, title: t.selectFeatureRealisticTitle, description: t.selectFeatureRealisticDescription },
        { icon: Target, title: t.selectFeatureFeedbackTitle, description: t.selectFeatureFeedbackDescription },
        { icon: TrendingUp, title: t.selectFeatureProgressTitle, description: t.selectFeatureProgressDescription },
        { icon: ShieldCheck, title: t.selectFeaturePrivateTitle, description: t.selectFeaturePrivateDescription }
    ];

    return (
        <section className="exam-select-feature-strip" aria-label={t.selectFeatureStripLabel}>
            {features.map(({ icon: Icon, title, description }) => (
                <article key={title} className="exam-select-feature-item">
                    <Icon className="exam-select-feature-icon" />
                    <div>
                        <h3 className="exam-select-feature-title">{title}</h3>
                        <p className="exam-select-feature-description">{description}</p>
                    </div>
                </article>
            ))}
        </section>
    );
}

function getDisplayTitle(exam, index) {
    if (CARD_TITLE_FALLBACKS[index]) {
        return CARD_TITLE_FALLBACKS[index];
    }

    const parts = exam.title.split(":");
    return parts.length > 1 ? parts.slice(1).join(":").trim() : exam.title;
}
