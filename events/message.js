const { FAQModule } = require('../db')
let querys = []

const init = async () => {
	const questions = await FAQModule.find({})
	// console.log('🚀 ~ file: message.js ~ line 6 ~ init ~ questions', questions)

	if (typeof questions === 'undefined') return

	questions.forEach((val) => {
		val.keys.forEach((key) => querys.push({ id: val._id.toString(), query: key.query, weight: key.weight }))
	})
}

init()

module.exports = {
	init,
	code: async (client, msg) => {
		if (msg.author.bot) return
		const couldbe = querys.filter((val) => msg.content.includes(val.query)).sort((a, b) => b.weight - a.weight)
		if (couldbe.length <= 0) return
		console.log(msg.content, couldbe)
	},
}
