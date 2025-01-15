const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Replies with the bot's ping as an embed!",
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
            .setColor('#FF007F') // Set the color of the embed (using hexadecimal)
            .setTitle('Pong!') // Title of the embed
            .setImage('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHdxN2Q1NDdld3FqbWxlN29wd3BteXo4emVxOHoybDUyMG1ucndmYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OieJgGdKOnlYY/giphy.gif')
            .addFields(
                { name: 'Client Ping', value: `${ping}ms`, inline: true },
                { name: 'WebSocket Ping', value: `${client.ws.ping}ms`, inline: true }
            )
            .setFooter({ text: 'Ping command', iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        interaction.editReply({ embeds: [embed] });
    },
};