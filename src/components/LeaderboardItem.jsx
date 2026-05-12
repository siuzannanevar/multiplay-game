function LeaderboardItem({place, name, score}) {
    return (
        <div className="leader-item">
            <span>
                 #{place} {name}
            </span>

            <span>
                {score}
            </span>
        </div>
    );
}

export default LeaderboardItem;