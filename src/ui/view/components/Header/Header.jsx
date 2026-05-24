//src/ui/view/components/Header/Header.jsx
import HeaderInfo from "./HeaderInfo.jsx";
import HeaderActions from "./HeaderActions.jsx";
import SettingsMenu from "../Settings/SettingsMenu.jsx";

export default function Header({ viewModel, onBack }) {
    return (
        <header className="exam-header">
            <div className="exam-header-container">
                <div className="exam-header-layout">
                    <div className="exam-header-left">
                        <div className="exam-header-mobile-menu">
                            <SettingsMenu />
                        </div>

                        <HeaderInfo
                            currentQuestionIndex={viewModel.currentQuestionIndex}
                            questionCount={viewModel.visibleQuestions.length}
                            onBack={onBack}
                        />
                    </div>

                    <HeaderActions viewModel={viewModel} />
                </div>
            </div>
        </header>
    );
}
