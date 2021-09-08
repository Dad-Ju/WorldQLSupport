const { Schema, model: MongooseModel } = require('mongoose')

const keySchema = new Schema({
	query: { type: 'String' },
	weight: { type: 'String' },
})

const faqSchema = new Schema({
	displayname: { type: 'String', unique: true },
	keys: [keySchema],
	awnser: { type: 'String' },
})

const FAQModel = MongooseModel('faqs', faqSchema, 'faq')

module.exports = FAQModel
