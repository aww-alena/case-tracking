const express = require('express')
const controller = require('../controllers/statistics')
const router = express.Router()

router.get('/overview', controller.overview)

module.exports = router