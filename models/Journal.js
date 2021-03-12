const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    comment: {
        type: String
    },
    minutes: {
        type: Number
    },
    value: {
        type: Number
    },
    rate: {
        type: Number
    },
    affair: {
        ref: 'affairs',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('journals', journalSchema)