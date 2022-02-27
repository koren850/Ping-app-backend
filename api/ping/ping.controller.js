const logger = require('../../services/logger.service')
var exec = require('child_process').exec;

async function ping(req, res) {
    function puts(error, stdout, stderr) {
        console.log(stdout)
        if (error) {
            logger.error('Error', error.message);
            if (stdout.trim().startsWith('Pinging')) res.send({ ping: stdout, count: +req.query.count });
            res.status(500).send()
            return
        }
        if (stderr) {
            logger.error('Error', stderr);
            res.status(500).send(stderr)
            return
        }
        logger.info(`Pinged ${req.query.site} ${req.query.count || 4} Times`)
        res.send({ ping: stdout, count: +req.query.count });
    }
    exec(`ping ${req.query.site} -n ${req.query.count || 4}`, puts)
}

module.exports = {
    ping
}

