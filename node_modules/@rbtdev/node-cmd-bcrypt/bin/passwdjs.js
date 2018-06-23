#!/usr/bin/env node


var passwdjs = require('../');
var version = require('../package.json').version;
var command = require('commander')

command
    .version(version)
    .usage('<cmd>')
    .description("Command line tool to hash and compare bcrypt passwords.");

command
    .command('hash [passwords...]')
    .description("Uses bcryptjs to hash each passoword provided or reads lines from stdin if no passwords are provided.")
    .option('-r, --rounds <n>', "Complexity factor for salt generation [10]", parseInt, 10)
    .option('-j, --json', 'Output a JSON object which is a map of plaintext to hash')
    .option('-f, --file <filename>', 'Read lines from the given file for passwords')
.action(hash)

command.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ passwdjs hash -j -r 12 password1 password2 password3 ');
    console.log('    {');
    console.log('      "$2a$12$QHEdi2VK9HhipSs9rVfQYOS0FwKnjxoL/1mhqkD67lZJ0luPhWX1u": "password1",');
    console.log('      "$2a$12$5pHzuObUEE5wSEOWBIayEe1Uv1RIRXpPVTxaKIXpW07t9fBrBJnWO": "password2",');
    console.log('      "$2a$12$H5eV9qwx82rZeQ8PbYaKW.Unc8uiz2LrvgLmCStdY9EFIiC44lxem": "password3",');
    console.log('    }');
    console.log('');
    console.log('    $ cat passwords.txt');
    console.log('    password1');
    console.log('    password2');
    console.log('    password3');
    console.log('    password4');
    console.log('    password5');
    console.log('');
    console.log('    $ cat passwords.txt | passwdjs hash -r 12 -j');
    console.log('    {');
    console.log('      "$2a$12$ErsnLyXSXaupErd5imARB.S6sl6QD8m0a.Z0ECGA5KsqiEVJs80W2": "password1",');
    console.log('      "$2a$12$6k/WRP17ba/XfewrzpOz5OJIIbiz12ocHbDJvRpk.USFTioUCnOem": "password2",');
    console.log('      "$2a$12$hkelc1Xu.jFq3UpRmidpCOvZcUEWIpKks0ZewkmArjLSxnCwhoDJ2": "password3",');
    console.log('      "$2a$12$WK1KVKmiH.heNTpUwR2IcuXyzCjrO64Nun/A5R11DavKcc48h0Epu": "password4",');
    console.log('      "$2a$12$86N8t.Ha/RbhM.VYaFJI6uUbZI3g8f93A2pmWz7AAReZ8aAYQm2KO": "password5"');
    console.log('    }');
    console.log('');
    console.log('    $ passwdjs hash -r 12 -j -f passwords.txt');
    console.log('    {');
    console.log('      "$2a$12$ErsnLyXSXaupErd5imARB.S6sl6QD8m0a.Z0ECGA5KsqiEVJs80W2": "password1",');
    console.log('      "$2a$12$6k/WRP17ba/XfewrzpOz5OJIIbiz12ocHbDJvRpk.USFTioUCnOem": "password2",');
    console.log('      "$2a$12$hkelc1Xu.jFq3UpRmidpCOvZcUEWIpKks0ZewkmArjLSxnCwhoDJ2": "password3",');
    console.log('      "$2a$12$WK1KVKmiH.heNTpUwR2IcuXyzCjrO64Nun/A5R11DavKcc48h0Epu": "password4",');
    console.log('      "$2a$12$86N8t.Ha/RbhM.VYaFJI6uUbZI3g8f93A2pmWz7AAReZ8aAYQm2KO": "password5"');
    console.log('    }');
    console.log('');
    console.log('    $ echo "password" | passwdjs hash -r 15');
    console.log('    $2a$15$mT4C4CHQuTcumZG74JlGhen2e.b9yAWVtIFREq9Pge6dDXUkHiZPG');
    console.log('');
});
command.parse(process.argv);

function hash(passwords, opts) {
    var options = {
        rounds: opts.rounds || 10,
        json: opts.json || false,
    }
    if (opts.file) {
        hashData(opts.file, options);
    } else if (passwords.length === 0) {
        readStdIn(hashData, options);
    } else {
        hashData(passwords, options);
    }
}

function readStdIn(cb, options) {
    var data = "";
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (chunk) {
        data += chunk;
    });
    process.stdin.on('end', function () {
        cb(data.split('\n'), options);
    });
}

function hashData(lines, options) {
    passwdjs(lines, options)
        .on('line', function (hashed) {
            if (!options.json) process.stdout.write(hashed + '\n');
        })
        .on('done', function (result) {
            if (options.json) {
                process.stdout.write(JSON.stringify(result, null, 2));
            }
            process.exit(0);
        })
        .on('error', function (err) {
            process.stderr.write(err.toString() + '\n');
            process.exit(1);
        })
}
