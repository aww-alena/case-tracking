const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aimSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    currentValue: {
        type: Number
    },
    targetValue: {
        type: Number,
    },
    measure: {
        type: String
    },
    tasks: [{
        name: {
            type: String
        },
        numberPerWeek: {
            type: Number
        },
        completion: [{
            done: {
                type: Date
            }
        }]
    }],
    intermediateValues: [{
        value: {
            type: Number
        },
        done: {
            type: Date
        }
    }],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('aims', aimSchema)