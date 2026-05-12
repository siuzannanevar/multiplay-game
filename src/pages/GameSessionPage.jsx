import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnswerButton from "../components/AnswerButton.jsx";
import { translations } from "../lang";
import GameInfo from "../components/GameInfo.jsx";
import TimerBar from "../components/TimerBar.jsx";

import { ref, push, set } from "firebase/database";
import { db } from "../firebase";

function GameSessionPage({ difficulty, language }) {
    const navigate = useNavigate();

    const [number1, setNumber1] = useState(1);
    const [number2, setNumber2] = useState(1);
    const [correctAnswer, setCorrectAnswer] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [name, setName] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    function generateQuestion() {
        const a = Math.floor(Math.random() * difficulty) + 1;
        const b = Math.floor(Math.random() * difficulty) + 1;
        const correct = a * b;

        const answerArray = [correct];

        const offsets = [-20, -10, -5, -2, -1, 1, 2, 5, 10, 20];

        while (answerArray.length < 4) {
            const offset = offsets[Math.floor(Math.random() * offsets.length)];
            const wrong = correct + offset;

            if (wrong > 0 && !answerArray.includes(wrong)) {
                answerArray.push(wrong);
            }
        }

        answerArray.sort(() => Math.random() - 0.5);

        setNumber1(a);
        setNumber2(b);
        setCorrectAnswer(correct);
        setAnswers(answerArray);
    }

    useEffect(() => {
        generateQuestion();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function checkAnswer(answer) {
        if (isLocked) return;

        setIsLocked(true);
        setSelectedAnswer(answer);

        const isCorrect = answer === correctAnswer;

        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
        }

        const delay = isCorrect ? 1000 : 3000;

        setTimeout(() => {
            generateQuestion();
            setSelectedAnswer(null);
            setIsLocked(false);
        }, delay);
    }

    function saveResult() {
        const resultsRef = ref(db, "results");
        const newRef = push(resultsRef);

        set(newRef, {
            name: name || "Anonymous",
            score: difficulty * correctAnswers,
            createdAt: Date.now()
        });
    }

    const t = translations?.[language] || translations.English;

    if (gameOver) {
        return (
            <div className="card">
                <h1>{t.gameOver}</h1>

                <h2>
                    {t.score}: {difficulty * correctAnswers}
                </h2>

                <input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    onClick={() => {
                        saveResult();
                        navigate("/result");
                    }}
                >
                    {t.save}
                </button>
            </div>
        );
    }

    return (
        <div className="card">

            <h1>Game Session</h1>

            <GameInfo
                time={time}
                score={difficulty * correctAnswers}
            />

            <TimerBar time={time} />

            <h1 className="question">
                {number1} × {number2}
            </h1>

            <div className="answers-grid">
                {answers.map((answer, index) => (
                    <AnswerButton
                        key={index}
                        value={answer}
                        onClick={checkAnswer}
                        disabled={isLocked}
                        isCorrect={selectedAnswer && answer === correctAnswer}
                        isWrong={selectedAnswer === answer && answer !== correctAnswer}
                    />
                ))}
            </div>

            <div style={{ marginTop: "30px" }}>
                <button onClick={() => setGameOver(true)}>
                    ⛔ Finish Game
                </button>
            </div>

        </div>
    );
}

export default GameSessionPage;