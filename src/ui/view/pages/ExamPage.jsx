//src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ExamProgress from "../components/ExamPage/ExamProgress/ExamProgress.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import ExamPageState from "../components/ExamPage/ExamPageState.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function ExamPage({ viewModel }) {
    const { t } = useLanguage();

    const activeOptionCount = viewModel.currentQuestion?.options?.length ?? 0;
    const activeDragDropTargetCount = viewModel.currentQuestion?.targets?.length ?? 0;
    const activeDragCategorizeCategoryCount = viewModel.currentQuestion?.categories?.length ?? 0;
    const activeMatrixQuadrantCount = viewModel.currentQuestion?.matrix?.quadrants?.length ?? viewModel.currentQuestion?.quadrants?.length ?? 0;
    const activeDragCategorizeLongestText = getLongestDragCategorizeTextLength(viewModel.currentQuestion);
    const activeMatrixPlacementLongestText = getLongestMatrixPlacementTextLength(viewModel.currentQuestion);
    const isDragDropQuestion = viewModel.currentQuestion?.type === QUESTION_TYPES.DRAG_DROP;
    const isDragCategorizeQuestion = viewModel.currentQuestion?.type === QUESTION_TYPES.DRAG_CATEGORIZE;
    const isMatrixPlacementQuestion = viewModel.currentQuestion?.type === QUESTION_TYPES.MATRIX_PLACEMENT;
    const shouldUseScrollFooter = !viewModel.submitted && (
        activeOptionCount >= 6 ||
        isDragDropQuestion ||
        isDragCategorizeQuestion ||
        isMatrixPlacementQuestion ||
        activeDragDropTargetCount >= 5 ||
        activeDragCategorizeCategoryCount >= 4 ||
        activeMatrixQuadrantCount >= 4
    );
    const shouldUseWideQuestionLayout = (isDragCategorizeQuestion && (
        activeDragCategorizeCategoryCount >= 5 ||
        activeDragCategorizeLongestText >= 34
    )) || (isMatrixPlacementQuestion && (
        activeMatrixQuadrantCount >= 4 ||
        activeMatrixPlacementLongestText >= 34
    ));
    const shouldUseExtraWideQuestionLayout = (isDragCategorizeQuestion && (
        (activeDragCategorizeCategoryCount >= 5 && activeDragCategorizeLongestText >= 44) ||
        activeDragCategorizeLongestText >= 62
    )) || (isMatrixPlacementQuestion && activeMatrixPlacementLongestText >= 70);
    const shouldUseDenseDragCategorizeLayout = isDragCategorizeQuestion && (
        activeDragCategorizeCategoryCount >= 5 ||
        activeDragCategorizeLongestText >= 44
    );

    const workspaceClassName = [
        "exam-workspace",
        viewModel.submitted ? "exam-workspace-feedback-mode" : "",
        shouldUseScrollFooter ? "exam-workspace-scroll-footer-mode" : "",
        shouldUseWideQuestionLayout ? "exam-workspace-wide-question-mode" : "",
        shouldUseExtraWideQuestionLayout ? "exam-workspace-extra-wide-question-mode" : "",
        shouldUseDenseDragCategorizeLayout ? "exam-workspace-dense-drag-categorize-mode" : "",
        isMatrixPlacementQuestion ? "exam-workspace-matrix-placement-mode" : ""
    ].filter(Boolean).join(" ");

    if (viewModel.loading) {
        return (
            <ExamPageState>
                <p className="exam-page-loading-message">
                    {t.loadingMessage}
                </p>
            </ExamPageState>
        );
    }

    if (viewModel.error) {
        return (
            <ExamPageState>
                <p className="exam-page-error-message">
                    {t.errorPrefix}: {viewModel.error}
                </p>
            </ExamPageState>
        );
    }

    return (
        <div
            ref={viewModel.examWorkspaceRef}
            className={workspaceClassName}
        >
            <Header viewModel={viewModel} />

            <ExamProgress
                visibleQuestions={viewModel.visibleQuestions}
                currentQuestionIndex={viewModel.currentQuestionIndex}
                onGoToQuestion={viewModel.goToQuestion}
            />

            <main className="exam-page-main">
                <div className="exam-page-content">
                    <ExamPageContent viewModel={viewModel} t={t} />
                </div>
            </main>

            <Footer viewModel={viewModel} />
        </div>
    );
}

const getLongestDragCategorizeTextLength = (question) => {
    if (question?.type !== QUESTION_TYPES.DRAG_CATEGORIZE) {
        return 0;
    }

    const itemLengths = (question.items ?? []).map((item) => String(item?.label ?? "").length);
    const categoryLengths = (question.categories ?? []).map((category) => String(category?.label ?? "").length);

    return Math.max(0, ...itemLengths, ...categoryLengths);
};


const getLongestMatrixPlacementTextLength = (question) => {
    if (question?.type !== QUESTION_TYPES.MATRIX_PLACEMENT) {
        return 0;
    }

    const quadrants = question.matrix?.quadrants ?? question.quadrants ?? [];
    const itemLengths = (question.items ?? []).map((item) => String(item?.label ?? item?.text ?? item?.title ?? "").length);
    const quadrantLengths = quadrants.flatMap((quadrant) => [
        String(quadrant?.title ?? quadrant?.label ?? "").length,
        String(quadrant?.description ?? quadrant?.text ?? "").length
    ]);
    const axisLengths = [
        String(question.matrix?.xAxis?.label ?? "").length,
        String(question.matrix?.yAxis?.label ?? "").length
    ];

    return Math.max(0, ...itemLengths, ...quadrantLengths, ...axisLengths);
};
