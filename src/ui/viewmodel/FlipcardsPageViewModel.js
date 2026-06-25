// src/ui/viewmodel/FlipcardsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useFlipcardsPageViewModel(
    getFlashcardsUseCase,
    subjectId,
    language,
    t,
    isActive
) {
    const [flashcards, setFlashcards] = useState([]);
    const [flashcardsLoading, setFlashcardsLoading] = useState(true);
    const [flashcardsLoadError, setFlashcardsLoadError] = useState(null);
    const [masteredCardIds, setMasteredCardIds] = useState([]);
    const [practiceCardIds, setPracticeCardIds] = useState([]);

    useEffect(() => {
        if (!isActive) {
            return undefined;
        }

        let cancelled = false;

        async function loadFlashcards() {
            try {
                setFlashcardsLoading(true);
                setFlashcardsLoadError(null);

                const loadedFlashcards = await getFlashcardsUseCase.execute({
                    subjectId,
                    language
                });

                if (!cancelled) {
                    setFlashcards(loadedFlashcards);
                    setMasteredCardIds([]);
                    setPracticeCardIds([]);
                }
            } catch (error) {
                console.error("Feil ved henting av flipcards:", error);

                if (!cancelled) {
                    setFlashcards([]);
                    setFlashcardsLoadError(t.flipcardsErrorMessage);
                }
            } finally {
                if (!cancelled) {
                    setFlashcardsLoading(false);
                }
            }
        }

        loadFlashcards();

        return () => {
            cancelled = true;
        };
    }, [getFlashcardsUseCase, subjectId, language, t.flipcardsErrorMessage, isActive]);

    const markCardAsMastered = useCallback((cardId) => {
        setMasteredCardIds((cardIds) => {
            if (cardIds.includes(cardId)) {
                return cardIds;
            }

            return [...cardIds, cardId];
        });
    }, []);

    const markCardForPractice = useCallback((cardId) => {
        setPracticeCardIds((cardIds) => {
            if (cardIds.includes(cardId)) {
                return cardIds;
            }

            return [...cardIds, cardId];
        });
    }, []);

    const progressLabel = useMemo(() => {
        if (typeof t.flipcardsProgressLabel === "function") {
            return t.flipcardsProgressLabel(masteredCardIds.length, practiceCardIds.length);
        }

        return `${masteredCardIds.length} mastered · ${practiceCardIds.length} practice`;
    }, [masteredCardIds.length, practiceCardIds.length, t]);

    return {
        t,
        flashcards,
        flashcardsLoading,
        flashcardsLoadError,
        progressLabel,
        masteredCardIds,
        practiceCardIds,
        markCardAsMastered,
        markCardForPractice
    };
}
