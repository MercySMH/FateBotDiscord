const {ApplicationCommandOptionType, PermissionFlagsBits}= require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server!!!.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'targer-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'reason',
            description: 'The reason for banning.',
            type: ApplicationCommandOptionType.String
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],


    callback: (client, interaction) => {
        interaction.reply(`ban..`);
    },
};