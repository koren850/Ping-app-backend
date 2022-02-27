const logger = require('../../services/logger.service')
var exec = require('child_process').exec;
var tcpp = require('tcp-ping');

async function ping(req, res) {

    tcpp.ping({ address: req.query.site, attempts: req.query.count }, function (err, data) {
        let error = data.results.every(ping => { return ping.err ? true : false })
        if (error) {
            logger.error('Error', error.message);
            res.status(500).send()
            return
        }
        logger.info(`Pinged ${req.query.site} ${req.query.count || 4} Times`)
        res.send(data);
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////
    //this is what i used in development. 
    //when i deployed i saw heroku cannot acsses the child process shell and connot ping
    //so used tcp-ping library instead
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // function puts(error, stdout, stderr) {
    //     console.log(stdout)
    //     if (error) {
    //         logger.error('Error', error.message);
    //         if (stdout.trim().startsWith('Pinging')) res.send({ ping: stdout, count: +req.query.count });
    //         res.status(500).send()
    //         return
    //     }
    //     if (stderr) {
    //         logger.error('Error', stderr);
    //         res.status(500).send(stderr)
    //         return
    //     }
    //     logger.info(`Pinged ${req.query.site} ${req.query.count || 4} Times`)
    //     res.send({ ping: stdout, count: +req.query.count });
    // }
    // exec(`ping ${req.query.site} -n ${req.query.count || 4}`, puts)
}

module.exports = {
    ping
}

