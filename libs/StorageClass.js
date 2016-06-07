var redis = require('redis'),
    log = require('../log');

//
// Handles the setup of xivsync
//
class StorageClass
{
    constructor()
    {
        this.client = redis.createClient();
        this.client.on("error", function (err) {
            log.echo('!!! [REDIS ERROR] {error:red}', {
                error: err,
            });
        });
    }

    //
    // Set some data
    //
    set(key, value)
    {
        log.echo('REDIS - {method:green}: {key:yellow}', {
            method: 'SET',
            key: key,
        });

        value = JSON.stringify(value);
        this.client.set(key, value);
    }

    //
    // Get some data
    //
    get(key, callback) {
        log.echo('REDIS - {method:green}: {key:yellow}', {
            method: 'GET',
            key: key,
        });

        this.client.get(key, (err, data) => {
            if (err) {
                return log.echo('!!! [REDIS ERROR] {error:red}', {
                    error: err,
                });
            }

            callback(JSON.parse(data));
        });
    }
}

// Export it
module.exports = new StorageClass();