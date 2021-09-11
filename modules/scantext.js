const { FAQModule } = require('../db')
let querys = []

const init = async () => {
	const questions = await FAQModule.find({})
	if (typeof questions === 'undefined') return
	querys = []
	questions.forEach((val) => {
		val.keys.forEach((key) => querys.push({ id: val._id.toString(), query: key.query, weight: key.weight }))
	})
}

init()

const test = async (input) => {
	if (typeof input !== 'string') return
	const couldbe = querys.filter((val) => input.includes(val.query)).sort((a, b) => b.weight - a.weight)
	if (couldbe.length <= 0) return

	return couldbe
}

module.exports = { init, test }
