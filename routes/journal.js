const express = require('express')
const controller = require('../controllers/journal')
const router = express.Router()
const passport = require('passport')

router.get('/all', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id/:idRecording', passport.authenticate('jwt', { session: false }), controller.getById)

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getAllHabitsById)

router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router