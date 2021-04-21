const mongoose = require('mongoose')
const Schema = mongoose.Schema

const habitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    schedule: {
        type: String
    },
    color: {
        type: String
    },
    hasTimer: {
        type: Boolean
    },
    hasRating: {
        type: Boolean
    },
    difficulty: {
        type: String
    },
    categories: {
        type: String
    },
    comment: {
        type: String
    },
    timeframe: {
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('habits', habitSchema)