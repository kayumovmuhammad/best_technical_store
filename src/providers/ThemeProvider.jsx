import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    function toggleTheme() {
        const newTheme = theme == "dark" ? "light" : "dark";

        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        document
            .querySelector("html")
            .classList.toggle("dark", theme == "dark");
    }, [theme]);

    return (
        <ThemeContext.Provider value={[theme, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}
