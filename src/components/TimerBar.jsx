function TimerBar({time}) {
    return (
        <div
            style={{
                width: "100%",
                height: "18px",
                background: "#ddd",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "20px"
            }}
        >
            <div
                style={{
                    width: `${(time / 60) * 100}%`,
                    height: "100%",
                    background: "#22c55e",
                    transition: "1s linear"
                }}
            />
        </div>
    );
}

export default TimerBar;