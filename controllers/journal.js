const JournalEntry = require('../models/JournalEntry')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = function(req, res) {}

module.exports.getById = async function(req, res) {

    console.log('req.params', req.params);
    try {
        const entry = await JournalEntry.find({
            idRecording: req.params.idRecording
        })

        res.status(200).json(entry)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = function(req, res) {

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

module.exports.update = function(req, res) {

}

const createjournalEntry = req => {
    return journalEntry = new JournalEntry({
        name: req.body.name,
        date: req.body.date,
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