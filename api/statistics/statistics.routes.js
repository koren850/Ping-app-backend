const express = require('express')

const { getStats, addStat } = require('./statistics.controller')
const router = express.Router()



router.get('/', getStats)
router.post('/', addStat)


module.exports = router