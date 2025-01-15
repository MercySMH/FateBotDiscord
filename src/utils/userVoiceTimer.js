const userVoiceTimers = new Map();
const afkChannelId = '1328898239889543289';

function startUserVoiceTimer(client) {
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
            userVoiceTimers.set(key, Date.now());
        }

        if (oldState.channel && !newState.channel) {
            const startTime = userVoiceTimers.get(key);
            if (startTime) {
                const duration = Date.now() - startTime;
                userVoiceTimers.delete(key);

                const durationInSeconds = Math.floor(duration / 1000);
                const hours = Math.floor(durationInSeconds / 3600);
                const minutes = Math.floor((durationInSeconds % 3600) / 60);
                const seconds = durationInSeconds % 60;

                const textChannelId = '1047739057733640222'; 
                const textChannel = client.channels.cache.get(textChannelId);
                if (textChannel) {
                    const durationMessage = `User ${userName} was in a voice chat for ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
                    textChannel.send(durationMessage);
                }
            }
        }
    });
}

module.exports = startUserVoiceTimer;