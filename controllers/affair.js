const Affair = require('../models/Affair')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req, res) {

    try {

        const affairs = await Affair.find({
            category: req.params.category_id,
            user: req.user.id
        })

        res.status(200).json(affairs)

    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getAll = async function(req, res) {
    try {
        const affairs = await Affair.find({
            user: req.user.id
        })

        res.status(200).json(affairs)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async function(req, res) {
    try {

        const affair = await Affair.find({
            user: req.params.id
        })

        res.status(200).json(affair)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function(req, res) {

    try {
        await Affair.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Affair removed successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {

    const affair = createAffair(req);

    try {

        await affair.save()
        res.status(200).json(affair)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res) {
    try {
        const affair = await Affair.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json(affair)
    } catch (error) {
        errorHandler(res, error)
    }
}

const createAffair = req => {
    return affair = new Affair({
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