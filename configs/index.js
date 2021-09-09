const fs = require('fs')
const path = require('path')

const feedCachePath = path.join(process.cwd(), './configs/feed.json')

const feedCache = {
	push: (item) => {
		feedCache.cache.push(item)
		fs.writeFileSync(feedCachePath, JSON.stringify(feedCache.cache, null, 4), { encoding: 'utf8' })
	},
	cache: (() => {
		try {
			return JSON.parse(fs.readFileSync(feedCachePath))
		} catch (error) {
			fs.writeFileSync(feedCachePath, '[]', { encoding: 'utf8' })
			return []
		}
	})(),
}

module.exports = { feedCache }
