const { createWorker } = require('tesseract.js')

/**
 * @param {import("discord.js").Message} msg
 */
const getTextFromImage = async (msg, link) => {
	msg.react('👀')
	const scanner = createWorker()
	await scanner.load()
	await scanner.loadLanguage('eng')
	await scanner.initialize('eng')
	const response = await scanner.recognize(link)
	// console.log(response)
	await scanner.terminate()

	return response.data.text
}

module.exports = { getTextFromImage }
