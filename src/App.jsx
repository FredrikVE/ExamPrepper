//src/App.jsx
import useExamViewModel from "./ui/viewmodel/useExamViewModel.js";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import { getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase } from "./di/dependencies.js";

export default function App() {
    
    const examViewModel = useExamViewModel(
        getExamQuestionsUseCase,
        gradeAnswerUseCase,
        calculateExamScoreUseCase
    );

    return <ExamPage viewModel={examViewModel} />;
}
