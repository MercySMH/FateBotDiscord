require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const loadLeaderboardData = require('./utils/loadLeaderboard');
const saveLeaderboardData = require('./utils/saveLeaderboard');
const startVoiceChannelTimer = require('./utils/voiceTimer');
const startUserVoiceTimer = require('./utils/userVoiceTimer');
const startLeaderboardTimer = require('./utils/leaderboardTimer');
const handleRoleColorInteraction = require('./utils/roleColorInteraction');
const eventHandler = require('./handlers/eventHandler'); 
const consoleLog = require('./events/ready/consoleLog'); 

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});

let userTotalTimes = loadLeaderboardData();

client.on('ready', () => {
    if (client.user) {
        consoleLog(client);  
    } else {
        console.error("Client user is not available yet.");
    }

    startVoiceChannelTimer(client);
    startUserVoiceTimer(client);
    startLeaderboardTimer(client, userTotalTimes, saveLeaderboardData);

    eventHandler(client); 
});

client.login(process.env.TOKEN);