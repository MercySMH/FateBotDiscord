const userVoiceTimersLB = new Map();
const afkChannelId = '1328898239889543289';

function startLeaderboardTimer(client, userTotalTimes, saveLeaderboardData) {
    client.on('voiceStateUpdate', (oldState, newState) => {
        const userId = newState.member?.id || oldState.member?.id;
        const userName = newState.member?.user.username || oldState.member?.user.username;
        if (!userId || !userName) return;

        const guildId = oldState.guild?.id || newState.guild?.id;
        const key = `${guildId}-${userId}`;

        if (newState.channel && newState.channel.id === afkChannelId) {
            console.log(`${newState.member.user.username} is in the AFK channel, not tracking time.`);
            return;
        }

        if (!oldState.channel && newState.channel) {
            userVoiceTimersLB.set(key, Date.now());
        }

        if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            const startTime = userVoiceTimersLB.get(key);
            if (startTime) {
                const duration = Date.now() - startTime;
                userVoiceTimersLB.delete(key);

                const totalTime = (userTotalTimes.get(userId) || 0) + duration;
                userTotalTimes.set(userId, totalTime);

                saveLeaderboardData(userTotalTimes);
            }

            userVoiceTimersLB.set(key, Date.now());
        }

        if (oldState.channel && !newState.channel) {
            const startTime = userVoiceTimersLB.get(key);
            if (startTime) {
                const duration = Date.now() - startTime;
                userVoiceTimersLB.delete(key);

                const totalTime = (userTotalTimes.get(userId) || 0) + duration;
                userTotalTimes.set(userId, totalTime);

                saveLeaderboardData(userTotalTimes);
            }
        }
    });
}

module.exports = startLeaderboardTimer;