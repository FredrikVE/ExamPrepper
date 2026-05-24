//src/ui/theme/ThemeContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const toggleTheme = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add("dark");
        } 
        else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}