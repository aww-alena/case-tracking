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
            message: 'The entry was successfully deleted'
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

    const journalObj = new JournalEntry({
        name: req.body.name
    });

    for (key in req.body) {
        if (!(req.body[key] === '' || req.body[key] === null) && key !== '_id') {
            journalObj[key] = req.body[key];
        }
    }

    journalObj.user = req.user.id;

    return journalObj;
}