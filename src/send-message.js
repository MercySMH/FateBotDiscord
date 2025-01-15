require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

const roles1 = [
    {
        id: '1328859712900304896',
        label: 'BLACK' 
        
    },
    {
        id: '1328860124626026537',
        label: 'WHITE' 
    },
    {
        id: '1328859425296875580',
        label: 'RED' 
    },
    {
        id: '1328860263050510347',
        label: 'BLUE' 
    },
    {
        id: '1328860467166314667',
        label: 'GREEN' 
    },
]

const roles2 = [
    {
        id: '1328860469628506142',
        label: 'PINK' 
    },
    {
        id: '1328860472052547666',
        label: 'ORANGE' 
    },
    {
        id: '1328860473994514482',
        label: 'YELLOW' 
    },
    {
        id: '1328860474552619049',
        label: 'PURPLE' 
    },
    {
        id: '1328860475982614620',
        label: 'CYAN' 
    },
]

const roles3 = [
    {
        id: '1328860475244417135',
        label: 'LIME' 
    },
    {
        id: '1328860476473479240',
        label: 'VIOLET' 
    },
    {
        id: '1328861710789906547',
        label: 'DARK RED' 
    },
    {
        id: '1328861709028429935',
        label: 'GOLD' 
    },
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('812490991717974036');
        if (!channel) return;

        const row1 = new ActionRowBuilder();

        const row2 = new ActionRowBuilder();

        const row3 = new ActionRowBuilder();

        const roleembed = new EmbedBuilder()
        .setTitle("Choose your Color!")
        .setColor('LuminousVividPink')
        .setImage('https://i.gifer.com/65t.gif')
        .setTimestamp();
        
        roles1.forEach((role) => {
            row1.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        roles2.forEach((role) => {
            row2.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })
        
        roles3.forEach((role) => {
            row3.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({embeds: [roleembed],
            components: [row1, row2, row3],
        });
        process.exit

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);