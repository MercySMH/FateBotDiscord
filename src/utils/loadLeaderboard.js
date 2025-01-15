const fs = require('fs');
const leaderboardFilePath = './leaderboard.json';

function loadLeaderboardData() {
    let userTotalTimes = new Map();
    if (fs.existsSync(leaderboardFilePath)) {
        const data = fs.readFileSync(leaderboardFilePath);
        userTotalTimes = new Map(JSON.parse(data));
    }
    return userTotalTimes;
}

module.exports = loadLeaderboardData;