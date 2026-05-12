function GameInfo({ time, score }) {
    return (
        <div className="game-info">
            <div className="game-box">
                ⏱ Time: {time}
            </div>

            <div className="game-box">
                ⭐ Score: {score}
            </div>
        </div>
    );
}

export default GameInfo;