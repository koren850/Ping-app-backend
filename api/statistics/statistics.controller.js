const statisticsService = require('./statistics.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')


async function getStats(req, res) {
    try {
        const pings = await statisticsService.query()
        res.send(pings)
    } catch (err) {
        logger.error('Failed to get pings', err)
        res.status(500).send({ err: 'Failed to get pings' })
    }
}

async function addStat(req, res) {
    try {
        const ping = req.body
        const statistics = await statisticsService.add(ping)
        res.send(statistics)
    } catch (err) {
        logger.error('Failed to update statistics', err)
        res.status(500).send({ err: 'Failed to update statistics' })
    }
}

module.exports = {
    getStats,
    addStat
}