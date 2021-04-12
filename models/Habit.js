const mongoose = require('mongoose')
const Schema = mongoose.Schema

const habitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ""
    },
    schedule: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    hasTimer: {
        type: Boolean,
        default: false
    },
    hasRating: {
        type: Boolean,
        default: false
    },
    difficulty: {
        type: String
    },
    categories: {
        type: String
    },
    comment: {
        type: String,
        default: ""
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