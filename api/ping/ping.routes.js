const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { ping } = require('./ping.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, ping)


module.exports = router