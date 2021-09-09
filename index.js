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

client.on('messageCreate', (msg) => {
	require('./events/faqmessagehandler').code(client, msg)
})

client.once('ready', () => {
	console.log(`| Bot Ready as ${client.user.tag}\n↳ ${new Date().toISOString()}`)
	client.user.setPresence({ activities: [{ name: 'Cool Peps', type: 'WATCHING' }], afk: false, status: 'online' })
	require('./events/faqmessagehandler').init()
	require('./events/queryBlog')(client)

	setInterval(() => {
		client.user.setPresence({ activities: [{ name: 'Cool Peps', type: 'WATCHING' }], afk: false, status: 'online' })
		require('./events/queryBlog')(client)
	}, 30000)
})

client.login(process.env.token)
