const { EmbedBuilder } = require('discord.js');
const fs = require('fs').promises; // Use fs.promises to work with files
const path = require('path');

module.exports = {
    name: 'vcleaderboard',
    description: "Displays the voice chat leaderboard.",
    callback: async (client, interaction) => {
        try {
            // Define the path to the leaderboard.json file (two levels up from src/commands to the root directory)
            const leaderboardFilePath = path.resolve(__dirname, '../../../leaderboard.json'); // Going two levels up

            // Load the leaderboard data from the JSON file
            let userTotalTimes;
            try {
                const data = await fs.readFile(leaderboardFilePath, 'utf-8');
                const parsedData = JSON.parse(data); // Parse the JSON data

                // Convert array to a Map directly
                userTotalTimes = new Map(parsedData.map(([userId, totalTime]) => [userId, totalTime])); // Create the Map from the array
            } catch (fileError) {
                console.error('Error reading leaderboard.json:', fileError);
                await interaction.reply('Could not load the leaderboard data. Please try again later.');
                return;
            }

            // Check if the leaderboard is empty
            if (!userTotalTimes || userTotalTimes.size === 0) {
                await interaction.reply('The leaderboard is empty. No users have been tracked yet.');
                return;
            }

            // Sort users by total time and get the top 10
            const sortedUsers = Array.from(userTotalTimes.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);

            // Create an embed for the leaderboard
            const leaderboardEmbed = new EmbedBuilder()
                .setTitle('Voice Chat Leaderboard')
                .setColor('LuminousVividPink')
                .setTimestamp()
                .setFooter({ text: 'Voice chat activity leaderboard' });

            // Fetch the first user's avatar
            const [firstUserId] = sortedUsers[0];
            const firstUser = await client.users.fetch(firstUserId);
            const avatarUrl = firstUser.displayAvatarURL({ format: 'png', size: 512 });

            leaderboardEmbed.setThumbnail(avatarUrl);

            // Construct the leaderboard message
            let leaderboardMessage = '';
            for (const [index, [userId, totalTime]] of sortedUsers.entries()) {
                const totalSeconds = Math.floor(totalTime / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                const user = await client.users.fetch(userId);
                leaderboardMessage += `${index + 1}. ${user.username} - ${hours} hours, ${minutes} minutes, ${seconds} seconds\n`;
            }

            leaderboardEmbed.setDescription(leaderboardMessage);

            // Send the embed as a reply
            await interaction.reply({ embeds: [leaderboardEmbed] });
        } catch (error) {
            console.error('An error occurred while executing the vcleaderboard command:', error);

            // Avoid duplicate replies by checking if interaction is already replied or deferred
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply('An error occurred while generating the leaderboard. Please try again later.');
            }
        }
    },
};
