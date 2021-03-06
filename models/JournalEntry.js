const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalEntrySchema = new Schema({
    done: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    comment: {
        type: String
    },
    timer: {
        status: {
            type: String
        },
        timestamp: [{
            start: {
                type: Date
            },
            stop: {
                type: Date
            }
        }]
    },
    value: {
        type: Number
    },
    rating: {
        type: Number
    },
    habit: {
        ref: 'habits',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    idRecording: {
        type: String
    }
})

module.exports = mongoose.model('journal', journalEntrySchema)