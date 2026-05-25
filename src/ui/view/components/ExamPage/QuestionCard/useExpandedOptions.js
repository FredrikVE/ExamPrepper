import { useCallback, useEffect, useState } from "react";

export function useExpandedOptions(resetKey) {
    const [expandedOptions, setExpandedOptions] = useState({});

    useEffect(() => {
        setExpandedOptions({});
    }, [resetKey]);

    const toggleExpanded = useCallback((index) => {
        setExpandedOptions((previous) => ({
            ...previous,
            [index]: !previous[index]
        }));
    }, []);

    const isExpanded = useCallback(
        (index) => Boolean(expandedOptions[index]),
        [expandedOptions]
    );

    return { isExpanded, toggleExpanded };
}
