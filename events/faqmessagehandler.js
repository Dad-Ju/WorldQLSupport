const { FAQModule } = require('../db')
const { getTextFromImage } = require('../modules/ocr')
const { test } = require('../modules/scantext')

/**
 *
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} msg
 * @returns
 */
const code = async (client, msg) => {
	if (msg.author.bot) return
	const tosearch = msg.attachments.size === 1 ? await getTextFromImage(msg, msg.attachments.first().url) : msg.content
	// console.log('🚀 ~ file: faqmessagehandler.js ~ line 13 ~ code ~ tosearch', tosearch)

	const result = await test(tosearch)

	if (typeof result !== 'undefined') return
	const resultDB = await FAQModule.findById(result[0].id)
	msg.reply(resultDB.anwser)
}

module.exports = code
