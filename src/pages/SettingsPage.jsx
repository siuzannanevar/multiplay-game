import { useNavigate } from "react-router-dom";
import { translations } from "../lang";

function SettingsPage({
    difficulty,
    setDifficulty,

    language,
    setLanguage,

    theme,
    setTheme
}) {
    const navigate = useNavigate();

    const t = translations?.[language] || translations.English;

    return (
        <div>
            <h1>{t.settings}</h1>

            <div>
                <h3>{t.language}</h3>

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="English">English</option>
                    <option value="Eesti">Eesti</option>
                    <option value="Russian">Russian</option>
                </select>
            </div>

            <div>
                <h3>{t.theme}</h3>

                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div>
                <h3>{t.difficulty}: {difficulty}</h3>

                <input
                    type="range"
                    min="2"
                    max="20"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                />
            </div>

            <br />

            <button onClick={() => navigate("/")}>
                {t.backHome}
            </button>

            <button onClick={() => navigate("/game")}>
                {t.start}
            </button>
        </div>
    );
}

export default SettingsPage;