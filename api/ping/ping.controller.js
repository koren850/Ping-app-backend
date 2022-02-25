const logger = require('../../services/logger.service')
var exec = require('child_process').exec;

async function ping(req, res) {
    function puts(error, stdout, stderr) {
        if (error) {
            logger.error('Error', error.message);
            res.status(500).send(error.message)
            return
        }
        if (stderr) {
            logger.error('Error', stderr);
            res.status(500).send(stderr)
            return
        }
        logger.info(`Pinged ${req.query.site} 4 Times`)
        res.send({ ping: stdout, count: +req.query.count });
    }
    exec(`ping  ${req.query.site} -n ${req.query.count || 4}`, puts)
}

module.exports = {
    ping
}

