const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    color: {
        type: String
    },
    hasTimer: {
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
    subtasks: [{
        date: {
            type: Date
        },
        timeframe: {
            type: String
        },
        name: {
            type: String
        },
        note: {
            type: String
        },
        doneDate: {
            type: Date
        },
        done: {
            type: Boolean
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
        }

    }],
    savedData: {
        date: {
            type: Date
        },
        comment: {
            type: String
        },
        done: {
            type: Boolean
        },
        timer: {
            status: {
                type: String
            },
            timestamp: [{
                start: {
                    type: Date | String
                },
                stop: {
                    type: Date | String
                }
            }]
        }
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('tasks', taskSchema)