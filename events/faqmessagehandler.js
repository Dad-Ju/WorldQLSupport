const { FAQModule } = require('../db')
const { getTextFromImage } = require('../modules/ocr')
const { test } = require('../modules/scantext')

/**
 *
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} msg
 * @returns
 */
const code = async (_client, msg) => {
	if (msg.author.bot) return
	const tosearch = msg.attachments.size === 1 ? await getTextFromImage(msg, msg.attachments.first().url) : msg.content

	const result = await test(tosearch)

	if (typeof result === 'undefined') return

	const resultDB = await FAQModule.findById(result)

	if (typeof resultDB === 'undefined') return

	msg.reply(resultDB.answer)
}

module.exports = code
