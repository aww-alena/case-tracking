const express = require('express')
const controller = require('../controllers/aim')
const router = express.Router()
const passport = require('passport')

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', controller.getById)

router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router