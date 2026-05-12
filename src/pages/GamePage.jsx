import { useNavigate } from "react-router-dom";
import { translations } from "../lang";

function GamePage({ difficulty, language }) {
    const navigate = useNavigate();

    const t = translations?.[language] || translations.English;

    return (
        <div>
            <h1>{t.game}</h1>

            <h2>
                {t.difficulty}: {difficulty}
            </h2>

            <button
                onClick={() => navigate("/game-session")}
            >
                {t.start}
            </button>

            <br />
            <br />

            <button onClick={() => navigate("/")}>
                {t.backHome}
            </button>

            <button onClick={() => navigate("/settings")}>
                {t.changeSettings}
            </button>
        </div>
    );
}

export default GamePage;