require('dotenv').config()
const { Client } = require('discord.js')
const QueryBlog = require('./events/queryBlog')
const TextScann = require('./modules/scantext')

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
	require('./events/faqmessagehandler')(client, msg)
})

client.once('ready', () => {
	console.log(`| Bot Ready as ${client.user.tag}\n↳ ${new Date().toISOString()}`)
	client.user.setPresence({ activities: [{ name: 'Cool Peps', type: 'WATCHING' }], afk: false, status: 'online' })
	TextScann.init()
	QueryBlog(client)

	setInterval(() => {
		client.user.setPresence({ activities: [{ name: 'Cool Peps', type: 'WATCHING' }], afk: false, status: 'online' })
		QueryBlog(client)
	}, 30000)
})

client.login(process.env.token)
