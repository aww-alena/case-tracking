const express = require('express');
const controller = require('../controllers/statistics');
const router = express.Router();
const passport = require('passport');

router.get('/habit/:id', passport.authenticate('jwt', { session: false }), controller.habit);
router.get('/category', passport.authenticate('jwt', { session: false }), controller.category);
router.get('/journal/month', passport.authenticate('jwt', { session: false }), controller.getLineChartData);
module.exports = router