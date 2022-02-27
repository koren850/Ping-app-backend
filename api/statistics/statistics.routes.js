const express = require('express')

const { getStats, addStat, getSpecificStat } = require('./statistics.controller')
const router = express.Router()



router.get('/', getStats)
router.post('/', addStat)
router.post('/getStat', getSpecificStat)


module.exports = router