const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String
    },
    schedule: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date,
        required: true
    },
    current_value: {
        type: Number,
        required: true
    },
    target_value: {
        type: Number,
        required: true
    },
    color: {
        type: String,
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('goals', goalSchema)