const voiceChannelTimers = new Map();

function startVoiceChannelTimer(client) {
    client.on('voiceStateUpdate', (oldState, newState) => {
        const voiceChannel = oldState.channel || newState.channel;
        if (!voiceChannel) return;

        const guildId = voiceChannel.guild.id;
        const channelId = voiceChannel.id;
        const key = `${guildId}-${channelId}`;

        if (!oldState.channel && newState.channel) {
            if (voiceChannel.members.size === 1) {
                voiceChannelTimers.set(key, Date.now());
            }
        }

        if (oldState.channel && !newState.channel && oldState.channel.members.size === 0) {
            const startTime = voiceChannelTimers.get(key);
            if (startTime) {
                const duration = Date.now() - startTime;
                const textChannelId = '1047739057733640222'; 
                const textChannel = client.channels.cache.get(textChannelId);
                if (textChannel) {
                    const durationInSeconds = Math.floor(duration / 1000);
                    const hours = Math.floor(durationInSeconds / 3600);
                    const minutes = Math.floor((durationInSeconds % 3600) / 60);
                    const seconds = durationInSeconds % 60;

                    const durationMessage = `The voice channel **${voiceChannel.name}** was active for ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
                    textChannel.send(durationMessage);
                }
                voiceChannelTimers.delete(key);
            }
        }
    });
}

module.exports = startVoiceChannelTimer;