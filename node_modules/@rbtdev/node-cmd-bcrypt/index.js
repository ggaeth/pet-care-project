var bcrypt = require('bcryptjs');
var EventEmitter = require('events').EventEmitter;
var async = require('async');
var fs = require('fs');

function passwdjs(arg, options) {
    var e = new EventEmitter();
    if (!arg) return setImmediate(e.emit('error', new Error("Invalid passwd parameter")))
    var lines = null;
    if (typeof arg === 'string') {
        try {
            lines = fs.readFileSync(arg).toString().split('\n');
            lines.splice(lines.length - 1, 1);
        } catch (ex) {
            setImmediate(function () {
                e.emit("error", ex)
            });
            return e;
        }
    } else lines = Array.isArray(arg) ? arg : [].push(arg);
    var opts = options ? options : {
        rounds: 10,
        json: false
    }
    async.mapSeries(lines, hash, function (err, results) {
        var result = results;
        if (opts.json) {
            result = {};
            lines.forEach(function (line, index) {
                var hash = results[index];
                if (hash) result[hash] = line;
            });
        }
        e.emit('done', result);
    })

    function hash(line, cb) {
        bcrypt.genSalt(opts.rounds, function (err, salt) {
            if (err) return cb(err);
            bcrypt.hash(line, salt, function (err, hashed) {
                if (err) return cb(err);
                e.emit('line', hashed);
                return cb(null, hashed);
            });
        });
    }
    return e;
}

module.exports = passwdjs;