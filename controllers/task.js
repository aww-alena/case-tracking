const Task = require('../models/Task')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')

module.exports.getByCategoryId = async function(req, res) {

    try {

        const tasks = await Task.find({
            category: req.params.category_id,
            user: req.user.id
        })

        res.status(200).json(tasks)

    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getAll = async function(req, res) {

    try {
        const tasks = await Task.find({
            user: req.user.id
        })

        res.status(200).json(tasks)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async function(req, res) {
    try {

        const task = await Task.findById(req.params.id)

        res.status(200).json(task)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function(req, res) {

    try {
        await Task.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Task removed successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {

    const task = createTask(req);

    try {

        await task.save()
        res.status(200).json(task)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res) {

    req.body.user = req.user.id;

    console.log(req.body);

    try {
        const task = await Task.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json(task)
    } catch (error) {
        errorHandler(res, error)
    }
}

const createTask = req => {

    const taskObj = new Task({
        name: req.body.name
    });

    for (key in req.body) {
        if (!(req.body[key] === '' || req.body[key] === null || req.body[key] === []) && key !== '_id') {
            taskObj[key] = req.body[key];
        }
    }

    taskObj.user = req.user.id;

    console.log(taskObj);



    return taskObj;
}