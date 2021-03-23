const Habit = require('../models/Habit')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req, res) {

    try {

        const habits = await Habit.find({
            category: req.params.category_id,
            user: req.user.id
        })

        res.status(200).json(habits)

    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getAll = async function(req, res) {
    try {
        const habits = await Habit.find({
            user: req.user.id
        })

        res.status(200).json(habits)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async function(req, res) {
    try {

        const habit = await Habit.find({
            user: req.params.id
        })

        res.status(200).json(habit)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function(req, res) {

    try {
        await Habit.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Habit removed successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {

    const habit = createHabit(req);

    try {

        await habit.save()
        res.status(200).json(habit)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res) {
    try {
        const habit = await Habit.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json(habit)
    } catch (error) {
        errorHandler(res, error)
    }
}

const createHabit = req => {
    return habit = new Habit({
        name: req.body.name,
        imageSrc: req.body.imageSrc,
        schedule: req.body.schedule,
        color: req.body.color,
        has_timer: req.body.has_timer,
        has_rating: req.body.has_rating,
        has_value: req.body.has_value,
        user: req.user.id
    })
}