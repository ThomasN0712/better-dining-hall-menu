import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from local storage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode and save preference in local storage
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode}className="text-neutral-900 dark:text-white hover:text-purple-700 dark:hover:text-yellow-400 transition duration-200">
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};
