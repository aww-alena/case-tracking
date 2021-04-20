const JournalEntry = require('../models/JournalEntry')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = function(req, res) {}

module.exports.getById = async function(req, res) {

    try {
        const entry = await JournalEntry.find({
            idRecording: req.params.idRecording
        })

        res.status(200).json(entry)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getAllHabitsById = async function(req, res) {

    try {
        const entry = await JournalEntry.find({
            habit: req.params.id
        })

        res.status(200).json(entry)

    } catch (error) {
        errorHandler(res, error)
    }
}



module.exports.remove = async function(req, res) {

    try {
        await JournalEntry.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Habit removed successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {
    const journalEntry = createjournalEntry(req);

    try {
        await journalEntry.save()
        res.status(200).json(journalEntry)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res) {

    try {
        const journalEntry = await JournalEntry.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json(journalEntry)
    } catch (e) {
        errorHandler(res, e)
    }
}

const createjournalEntry = req => {
    return journalEntry = new JournalEntry({
        done: req.body.done,
        comment: req.body.comment,
        timer: req.body.timer,
        value: req.body.value,
        rate: req.body.rate,
        habit: req.body.habit,
        category: req.body.category,
        idRecording: req.body.idRecording,
        user: req.user.id
    })
}