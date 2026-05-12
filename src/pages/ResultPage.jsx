import { useNavigate } from "react-router-dom";
import LeaderboardItem from "../components/LeaderboardItem.jsx";
import { translations } from "../lang";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

function ResultPage({ language }) {
    const navigate = useNavigate();

    const t = translations?.[language] || translations.English;

    const [results, setResults] = useState([]);

    useEffect(() => {
        const resultsRef = ref(db, "results");

        onValue(resultsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setResults(Object.values(data));
            } else {
                setResults([]);
            }
        });
    }, []);

    const sorted = [...results].sort((a, b) => b.score - a.score);
    const top5 = sorted.slice(0, 5);

    return (
        <div className="card">
            <h1>🏆 {t.leaderboard || "Leaderboard"}</h1>

            {top5.length === 0 ? (
                <p>{t.noResults || "No results yet"}</p>
            ) : (
                <div>
                    {top5.map((item, index) => (
                        <LeaderboardItem
                            key={index}
                            place={index + 1}
                            name={item.name}
                            score={item.score}
                        />
                    ))}
                </div>
            )}

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => navigate("/")}>
                    🏠 {t.home}
                </button>

                <button onClick={() => navigate("/game")}>
                    🎮 {t.start || "Play Again"}
                </button>
            </div>
        </div>
    );
}

export default ResultPage;