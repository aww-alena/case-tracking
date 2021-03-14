const Goal = require('../models/Goal')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const goals = await Goal.find({
            user: req.user.id
        })

        res.status(200).json(goals)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async function(req, res) {
    try {

        const goal = await Goal.findById(req.params.id)
        res.status(200).json(goal)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Goal.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Goal removed successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {
    try {
        const goal = await createGoal(req.body).save();
        res.status(200).json(goal)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res) {
    try {
        const goal = await Goal.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json(goal)
    } catch (error) {
        errorHandler(res, error)
    }
}

const createGoal = newGoal => {
    return goal = new Goal({
        name: newGoal.name,
        imageSrc: newGoal.imageSrc,
        schedule: newGoal.schedule,
        color: newGoal.color,
        has_timer: newGoal.has_timer,
        has_rating: newGoal.has_rating,
        has_value: newGoal.has_value,
        category: newGoal.categoryId,
        user: newGoal.userId,
        start_date: newGoal.start_date,
        end_date: newGoal.end_date,
        current_value: newGoal.current_value,
        target_value: newGoal.target_value
    })
}