var passwdjs = require('../');

var opts = {
    rounds: 12, // rounds to use (complexity).  see bcryptjs for details. 
    json: true, // true to output JSON object with hashes and passwords
};

/**
 * Hash file of passwords, result in object
 */
passwdjs('test/test.txt', opts)
    .on('line', doSomethingWithLine)
    .on('done', doSomethingWithResultsObj)
    .on('error', doSomethingWithError)

function doSomethingWithLine(line) {
    console.log('line =', line);
};

function doSomethingWithResultsObj(results) {
    for (var hash in results) {
        var plaintext = results[hash]
        console.log("the bcrypt hash for " + plaintext + " is " + hash);
    };
}

function doSomethingWithError(err) {
    console.log(err);
}