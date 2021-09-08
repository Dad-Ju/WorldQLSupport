require('dotenv').config()
const { Client } = require('discord.js')

const client = new Client({
	intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
	partials: ['REACTION'],
	presence: {
		afk: true,
		status: 'dnd',
		activities: [{ name: 'over it Files...', type: 'WATCHING' }],
	},
})

require('./db')

client.once('ready', () => {
	console.log(`| Bot Ready as ${client.user.tag}\n↳ ${new Date().toISOString()}`)
})

client.login(process.env.token)
