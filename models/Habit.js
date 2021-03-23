const mongoose = require('mongoose')
const Schema = mongoose.Schema

const habitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    schedule: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    has_timer: {
        type: Boolean,
        default: ''
    },
    has_rating: {
        type: Boolean,
        default: ''
    },
    has_value: {
        type: Boolean,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('habits', habitSchema)