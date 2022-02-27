
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const pingService = require('../ping/ping.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getBySite,
    remove,
    update,
    add,
    getPingObj
}

async function query() {
    try {
        const collection = await dbService.getCollection('ping')
        var pings = await collection.find().toArray()
        pings = pings.map(ping => {
            ping.createdAt = ObjectId(ping._id).getTimestamp()
            return ping
        })
        return pings
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getBySite(site) {
    try {
        const collection = await dbService.getCollection('ping')
        const siteStats = await collection.find({ site }).toArray()
        return siteStats
    } catch (err) {
        logger.error(`while getting site ${site}`, err)
        throw err
    }
}


async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id), // needed for the returnd obj
            username: user.username,
            fullname: user.fullname,
            score: user.score,
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(ping) {
    try {

        const collection = await dbService.getCollection('ping')
        const addedPing = await collection.insertOne(ping)
        return addedPing
    } catch (err) {
        logger.error('cannot insert ping', err)
        throw err
    }
}

function getPingObj(data) {
    let received = 0
    let lost = 0
    const pings = {}
    data.results.forEach((ping, idx) => {
        if (ping.time) received++;
        else if (ping.err) lost
        pings[idx] = ping.time
    })
    return { site: data.address, date: _convertTime(), stats: { pings, maximum: data.max, minimum: data.min, average: data.avg, sent: data.results.length, lost, received } }
}


function _convertTime() {
    return new Date().toLocaleTimeString('heb-IS', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}





