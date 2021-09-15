const { FAQModule } = require('../db')
let querys = {}

const init = async () => {
	const questions = await FAQModule.find({})
	if (typeof questions === 'undefined') return
	querys = {}
	questions.forEach((val) => {
		val.keys.forEach((key) =>
			typeof querys[key.query] === 'undefined'
				? (querys[key.query] = [{ id: val.id, weight: parseInt(key.weight) }])
				: querys[key.query].push({ id: val.id, weight: parseInt(key.weight) }),
		)
	})
}

init()

const test = async (input) => {
	if (typeof input !== 'string') return
	const couldbe = Object.keys(querys)
		.filter((val) => input.toLowerCase().includes(val))
		.map((key) => querys[key])

	// Check if any Hits at all
	if (couldbe.length <= 0) return undefined

	// Sort by Points (i hate reduce magic ...)
	const resultMap = couldbe.flat().reduce((acc, key) => ({ ...acc, [key.id]: acc[key.id] ? acc[key.id] + key.weight : key.weight }), {})

	const result = Object.entries(resultMap).sort((a, b) => b[1] - a[1])
	// console.log('🚀 ~ file: scantext.js ~ line 36 ~ result ~ result', result)

	return result[0][0]
}

module.exports = { init, test }
