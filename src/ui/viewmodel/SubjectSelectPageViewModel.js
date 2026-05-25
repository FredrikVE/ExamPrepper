//src/ui/viewmodel/SubjectSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

const LOAD_ERROR_MESSAGE = "Kunne ikke laste fag";

export default function useSubjectSelectPageViewModel(getAvailableSubjectsUseCase, language, t, selectedSubjectId, onSelectSubject) {
    // Statevariabler for fag-data, loading og error
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter-tilstander
    const [searchTerm, setSearchTerm] = useState("");
    const [faculty, setFaculty] = useState("all");

    // Henter tilgjengelige fag for aktivt språk
    useEffect(() => {
        let cancelled = false;

        const fetchSubjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await getAvailableSubjectsUseCase.execute({ lang: language });

                if (!cancelled) {
                    setSubjects(result);
                }
            }
            catch (error) {
                console.error("Feil ved henting av fag:", error);

                if (!cancelled) {
                    setError(error?.message ?? LOAD_ERROR_MESSAGE);
                }
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchSubjects();

        return () => {
            cancelled = true;
        };
    }, [getAvailableSubjectsUseCase, language]);

    const selectedSubject = useMemo(() => {
        return subjects.find((subject) => subject.id === selectedSubjectId) ?? subjects[0] ?? null;
    }, [subjects, selectedSubjectId]);

    const faculties = useMemo(() => {
        const values = subjects
            .map((subject) => subject.faculty)
            .filter(Boolean);

        return [...new Set(values)];
    }, [subjects]);

    const filteredSubjects = useMemo(() => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        return subjects.filter((subject) => {
            const matchesSearch = normalizedSearchTerm.length === 0
                || [subject.code, subject.name, subject.description]
                    .filter(Boolean)
                    .some((value) => value.toLowerCase().includes(normalizedSearchTerm));

            const matchesFaculty = faculty === "all" || subject.faculty === faculty;

            return matchesSearch && matchesFaculty;
        });
    }, [subjects, searchTerm, faculty]);

    const selectSubject = useCallback((subjectId) => {
        onSelectSubject(subjectId);
    }, [onSelectSubject]);

    return {
        // Data
        subjects,
        selectedSubject,
        filteredSubjects,
        faculties,
        loading,
        error,
        t,

        // Filter-verdier
        searchTerm,
        faculty,

        // Setters
        setSearchTerm,
        setFaculty,

        // Handlers
        selectSubject
    };
}
