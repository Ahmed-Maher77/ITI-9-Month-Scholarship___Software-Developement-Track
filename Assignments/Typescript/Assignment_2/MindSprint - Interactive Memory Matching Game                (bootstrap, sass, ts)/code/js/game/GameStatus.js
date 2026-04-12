var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Idle"] = 0] = "Idle";
    GameStatus[GameStatus["Playing"] = 1] = "Playing";
    GameStatus[GameStatus["Checking"] = 2] = "Checking";
    GameStatus[GameStatus["Paused"] = 3] = "Paused";
    GameStatus[GameStatus["Won"] = 4] = "Won";
    GameStatus[GameStatus["Lost"] = 5] = "Lost";
})(GameStatus || (GameStatus = {}));
export default GameStatus;
//# sourceMappingURL=GameStatus.js.map