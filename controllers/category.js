const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {

    try {
        const categories = await Category.find({
            user: req.user.id
        })

        res.status(200).json(categories)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res) {

    const category = new Category({
        name: req.body.name,
        user: req.user.id
    })

    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}