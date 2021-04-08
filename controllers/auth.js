const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {

    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {

        const isPasswordsMatch = bcrypt.compareSync(req.body.password, candidate.password)

        if (isPasswordsMatch) {

            res.status(200).json({
                token: getToken(candidate),
                message: 'Yea good'
            })

        } else {
            res.status(401).json({
                message: 'Passwords are not match'
            })
        }

    } else {
        res.status(404).json({
            message: 'Not found'
        })
    }
}

module.exports.register = async function(req, res) {

    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {

        res.status(409).json({
            message: 'This email is already registered'
        })

    } else {

        const user = createUser(req.body)

        try {
            await user.save()
            res.status(201).json(user)

        } catch (error) {
            errorHandler(res, error)
        }

    }
}

const getPassword = password => {

    const salt = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
}

const getToken = candidate => {
    return token = 'Bearer ' + jwt.sign({
        email: candidate.email,
        userId: candidate._id
    }, keys.jwt, { expiresIn: 36000 })
}

const createUser = newUser => {
    return user = new User({
        email: newUser.email,
        password: getPassword(newUser.password),
        name: newUser.name
    })
}