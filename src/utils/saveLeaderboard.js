const fs = require('fs');
const leaderboardFilePath = './leaderboard.json';

function saveLeaderboardData(userTotalTimes) {
    const data = JSON.stringify(Array.from(userTotalTimes.entries()));
    fs.writeFileSync(leaderboardFilePath, data);
}

module.exports = saveLeaderboardData;