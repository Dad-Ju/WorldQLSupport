const { default: axios } = require('axios')
const { feedCache } = require('../configs')
const { MessageEmbed } = require('discord.js')

const htmltotext = (raw) =>
	raw
		.replace(/\n/gi, '')
		.replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/gi, '')
		.replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/gi, '')
		.replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/gi, '')
		.replace(/<\/\s*(?:p|div)>/gi, '\n')
		.replace(/<br[^>]*\/?>/gi, '\n')
		.replace(/<[^>]*>/gi, '')
		.replace('&nbsp;', ' ')
		.replace(/[^\S\r\n][^\S\r\n]+/gi, ' ')

const queryBlog = async (client) => {
	const feedurl = 'https://www.worldql.com/feed/feed.json'

	const { data } = await axios.get(feedurl, { responseType: 'json' })

	if (typeof data === 'undefined') return

	const newstuff = data.items.filter((item) => !feedCache.cache.includes(item.id))

	if (newstuff.lenght < 1) return

	const guild = await client.guilds.fetch(process.env.guilde)
	const channel = await guild.channels.fetch(process.env.newschannel)

	for (index in newstuff) {
		const poste = newstuff[index]
		const msg = await channel.send({
			content: "'PING ROLE AKA EVERYONE'(REPLACE ME)",
			embeds: [
				new MessageEmbed()
					.setColor('RANDOM')
					.setAuthor(data.author.name, guild.iconURL(), data.author.url)
					.setURL(poste.url)
					.setTitle(poste.title.replaceAll('&#39;', "'"))
					.setDescription(
						'```\n' +
							htmltotext(poste.content_html).replaceAll('&quot;', '"').trim().slice(0, 1020) +
							'...\n```\n [READ MORE](' +
							poste.url +
							')',
					),
			],
		})

		if (typeof msg === 'undefined') return

		feedCache.push(poste.id)
	}
}

module.exports = queryBlog
