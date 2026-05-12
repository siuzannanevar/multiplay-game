function AnswerButton({ value, onClick, disabled, isCorrect, isWrong, showCorrect }) {
    let className = "answer";

    if (showCorrect) className = "answer correct";
    else if (isWrong) className = "answer wrong";
    else if (isCorrect) className = "answer correct";

    return (
        <button
            className={className}
            onClick={() => onClick(value)}
            disabled={disabled}
        >
            {value}
        </button>
    );
}

export default AnswerButton;