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
	const resultMap = couldbe.reduce((acc, keys) => {
		// let cache = { ...acc }
		for (i in keys) {
			const query = keys[i]
			// console.log(acc[query.id] + query.weight)
			// TODO: Why isnt the short form working ????
			// cache[query.id] = cache[query.id] ? cache[query.id] + querys.weight : query.weight
			if (acc[query.id]) {
				acc[query.id] += query.weight
			} else {
				acc[query.id] = query.weight
			}
		}
		return acc
	}, {})

	const result = Object.entries(resultMap).sort((a, b) => b[1] - a[1])
	// console.log('🚀 ~ file: scantext.js ~ line 36 ~ result ~ result', result)

	return result[0][0]
}

module.exports = { init, test }
