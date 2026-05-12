import { Routes, Route } from "react-router-dom"; // Убрали импорт BrowserRouter
import HomePage from "./pages/HomePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import GameSessionPage from "./pages/GameSessionPage.jsx";
import { useState } from "react";
import Layout from "./components/Layout.jsx";

function App() {
    const [difficulty, setDifficulty] = useState(10);
    const [language, setLanguage] = useState("English");
    const [theme, setTheme] = useState("light");

    return (
        // Роутер убран, так как он уже есть в main.jsx
        <Routes>
            <Route element={<Layout theme={theme} />}>

                <Route
                    path="/"
                    element={
                        <HomePage
                            language={language}
                        />
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <SettingsPage
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                            language={language}
                            setLanguage={setLanguage}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    }
                />

                <Route
                    path="/result"
                    element={
                        <ResultPage
                            language={language}
                        />
                    }
                />

                <Route
                    path="/game"
                    element={
                        <GamePage
                            difficulty={difficulty}
                            language={language}
                        />
                    }
                />

                <Route
                    path="/game-session"
                    element={
                        <GameSessionPage
                            difficulty={difficulty}
                            language={language}
                        />
                    }
                />

            </Route>
        </Routes>
    );
}

export default App;