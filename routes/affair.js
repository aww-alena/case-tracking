const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/affair')
const router = express.Router()


router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.get('/:category_id', passport.authenticate('jwt', { session: false }), controller.getByCategoryId)

router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router