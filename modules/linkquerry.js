const { default: axios } = require('axios')
module.exports = async (rawlink) => {
	let link = ['hastebin', 'pastebin', 'privatebin'].some((val) => rawlink.includes(val))
		? rawlink.split('/', 1).splice(1, 0, 'raw').join('/')
		: rawlink
	const { data: content } = await axios.get(link).catch()

	if (typeof content == undefined) return

	return content
}
