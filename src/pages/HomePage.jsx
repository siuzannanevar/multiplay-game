import { useNavigate } from 'react-router-dom';
import { translations } from "../lang";

function HomePage({ language }) {
    const navigate = useNavigate();

    const t = translations?.[language] || translations.English;

    return (
        <div>
            <h1>Multiplication Game</h1>

            <button onClick={() => navigate("/game")}>
                {t.game}
            </button>

            <button onClick={() => navigate("/result")}>
                {t.results}
            </button>

            <button onClick={() => navigate("/settings")}>
                {t.settings}
            </button>
        </div>
    );
}

export default HomePage;