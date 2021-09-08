const mongoose = require('mongoose')

mongoose.connect(process.env.mongodbstr, (con) => {
	console.log(`Connected to => ${mongoose.connection.db.databaseName}`)
})

module.exports = { FAQModule: require('./faq') }
