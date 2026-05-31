// src/ui/view/components/ExamPage/FeedbackPanel/FeedbackPanel.jsx
import { AlertTriangle, BookOpen, CheckCircle2, Info, Quote, XCircle } from "lucide-react";
import getAnswerLabel from "./Utils/getAnswerLabel.js";
import { useLanguage } from "../../../../../i18n/LanguageContext.jsx";
import FormattedText from "../../Shared/FormattedText.jsx";

export default function FeedbackPanel({ question, selected, correct, fillMatchType }) {
    const { t } = useLanguage();

    if (question.type === "fill") {
        return (
            <FillFeedbackPanel
                question={question}
                selected={selected}
                correct={correct}
                fillMatchType={fillMatchType}
                t={t}
            />
        );
    }

    return (
        <div className="feedback-panel">
            <FeedbackSummary correct={correct} t={t} />

            <OptionFeedback
                question={question}
                selected={selected}
                t={t}
            />

            <FeedbackSource
                source={question.source}
                t={t}
            />
        </div>
    );
}

function FillFeedbackPanel({ question, selected, correct, fillMatchType, t }) {
    const selectedAnswer = String(selected ?? "").trim();
    const correctAnswer = getAnswerLabel(question);
    const isFuzzy = fillMatchType === "fuzzy";

    return (
        <div className="feedback-panel">
            <div
                className={`feedback-panel-summary feedback-panel-fill-summary ${
                    correct
                        ? "feedback-panel-summary-correct"
                        : "feedback-panel-summary-wrong"
                }`}
            >
                <div className="feedback-panel-summary-title">
                    {correct ? (
                        <CheckCircle2 className="feedback-panel-summary-icon" />
                    ) : (
                        <XCircle className="feedback-panel-summary-icon" />
                    )}

                    {correct ? t.feedbackCorrectLabel : t.feedbackWrongLabel}
                </div>

                {isFuzzy ? (
                    <p className="feedback-panel-fill-fuzzy-note">
                        <Info className="feedback-panel-fill-fuzzy-note-icon" />
                        {t.feedbackFuzzyMatchNote}
                    </p>
                ) : null}

                <div className="feedback-panel-fill-divider" />

                <div className="feedback-panel-fill-comparison">
                    <div className="feedback-panel-fill-column">
                        <div className="feedback-panel-fill-column-title">
                            {t.feedbackYourAnswerLabel}
                        </div>

                        <div
                            className={`feedback-panel-fill-answer-pill ${
                                correct
                                    ? "feedback-panel-fill-answer-pill-correct"
                                    : "feedback-panel-fill-answer-pill-wrong"
                            }`}
                        >
                            {selectedAnswer || "—"}
                        </div>
                    </div>

                    <div className="feedback-panel-fill-column">
                        <div className="feedback-panel-fill-column-title">
                            {t.feedbackCorrectAnswerLabel}
                        </div>

                        <div className="feedback-panel-fill-answer-pill feedback-panel-fill-answer-pill-correct">
                            <FormattedText text={correctAnswer} />
                        </div>
                    </div>
                </div>

                <p className="feedback-panel-answer">
                    <span className="feedback-panel-answer-label">
                        {t.feedbackAnswerLabel}
                    </span>{" "}
                    <FormattedText text={correctAnswer} />
                </p>
            </div>

            <FillExplanation
                question={question}
                correct={correct}
                t={t}
            />

            <FeedbackSource
                source={question.source}
                t={t}
            />
        </div>
    );
}

function FeedbackSummary({ correct, t }) {
    return (
        <div
            className={`feedback-panel-summary ${
                correct
                    ? "feedback-panel-summary-correct"
                    : "feedback-panel-summary-wrong"
            }`}
        >
            <div className="feedback-panel-summary-title">
                {correct ? (
                    <CheckCircle2 className="feedback-panel-summary-icon" />
                ) : (
                    <XCircle className="feedback-panel-summary-icon" />
                )}

                {correct ? t.feedbackCorrectLabel : t.feedbackWrongLabel}
            </div>
        </div>
    );
}

function FillExplanation({ question, correct, t }) {
    const images = Array.isArray(question.whyExtendedImages)
        ? question.whyExtendedImages
        : [];

    return (
        <div className="feedback-panel-explanation-list">
            <section className="feedback-panel-explanation-card feedback-panel-explanation-card-correct">
                <div className="feedback-panel-explanation-icon-wrap">
                    <Info className="feedback-panel-explanation-icon" />
                </div>

                <div className="feedback-panel-explanation-content">
                    <h3 className="feedback-panel-explanation-title">
                        {t.feedbackWhyCorrectTitle}
                    </h3>

                    <p className="feedback-panel-explanation-text">
                        <FormattedText text={question.whyCorrect} />
                    </p>
                </div>
            </section>

            {!correct && question.whyWrong ? (
                <section className="feedback-panel-explanation-card feedback-panel-explanation-card-wrong">
                    <div className="feedback-panel-explanation-icon-wrap">
                        <AlertTriangle className="feedback-panel-explanation-icon" />
                    </div>

                    <div className="feedback-panel-explanation-content">
                        <h3 className="feedback-panel-explanation-title">
                            {t.feedbackWhyWrongTitle}
                        </h3>

                        <p className="feedback-panel-explanation-text">
                            <FormattedText text={question.whyWrong} />
                        </p>
                    </div>
                </section>
            ) : null}

            <FeedbackImages images={images} />
        </div>
    );
}

function FeedbackImages({ images }) {
    if (images.length === 0) {
        return null;
    }

    return (
        <div className="question-card-answer-extended-images feedback-panel-explanation-images">
            {images.map((image) => (
                <figure
                    key={image.id ?? image.src}
                    className="question-card-answer-extended-figure feedback-panel-explanation-figure"
                >
                    {image.title ? (
                        <figcaption className="question-card-answer-extended-figure-title">
                            {image.title}
                        </figcaption>
                    ) : null}

                    <img
                        className="question-card-answer-extended-image"
                        src={image.src}
                        alt={image.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                    />

                    {image.caption ? (
                        <p className="question-card-answer-extended-figure-caption">
                            {image.caption}
                        </p>
                    ) : null}
                </figure>
            ))}
        </div>
    );
}

function OptionFeedback({ question, selected, t }) {
    return (
        <div className="feedback-panel-box">
            <div className="feedback-panel-options-title">
                {t.feedbackOptionsTitle}
            </div>

            <div className="feedback-panel-options-list">
                {question.options.map((option, index) => {
                    const wasSelected =
                        question.type === "single"
                            ? selected === index
                            : Array.isArray(selected) && selected.includes(index);

                    return (
                        <div key={index} className="feedback-panel-option">
                            <div className="feedback-panel-option-header">
                                <span>{String.fromCharCode(65 + index)}.</span>

                                <span
                                    className={
                                        option.correct
                                            ? "feedback-panel-option-correct"
                                            : "feedback-panel-option-wrong"
                                    }
                                >
                                    {option.correct
                                        ? t.feedbackOptionCorrect
                                        : t.feedbackOptionWrong}
                                </span>

                                {wasSelected ? (
                                    <span className="feedback-panel-option-selected">
                                        {t.feedbackOptionSelected}
                                    </span>
                                ) : null}
                            </div>

                            <p className="feedback-panel-option-text">
                                <FormattedText text={option.why} />
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function FeedbackSource({ source, t }) {
    return (
        <div className="feedback-panel-source">
            <div className="feedback-panel-source-header">
                <span className="feedback-panel-source-icon-wrap">
                    <BookOpen className="feedback-panel-source-icon" />
                </span>

                <h3 className="feedback-panel-source-title">
                    {t.feedbackSourceTitle}
                </h3>
            </div>

            <div className="feedback-panel-source-quote">
                <Quote className="feedback-panel-source-quote-icon" />

                <p className="feedback-panel-source-text">
                    <FormattedText text={source} />
                </p>
            </div>
        </div>
    );
}
