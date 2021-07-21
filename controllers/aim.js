const Aim = require('../models/Aim')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const aims = await Aim.find({
            user: req.user.id
        })

        res.status(200).json(aims)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async function(req, res) {
    try {

        const aim = await Aim.findById(req.params.id)
        res.status(200).json(aim)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Aim.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Aim removed successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {

    const aim = createAim(req);

    console.log(aim);

    try {
        await aim.save();
        res.status(200).json(aim)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res) {
    try {
        const aim = await Aim.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json(aim)
    } catch (error) {
        errorHandler(res, error)
    }
}

const createAim = req => {

    const aimObj = new Aim({
        name: req.body.name
    });

    for (key in req.body) {
        if (!(req.body[key] === '' || req.body[key] === null)) {
            aimObj[key] = req.body[key];
        }
    }

    aimObj.user = req.user.id;

    return aimObj;
}