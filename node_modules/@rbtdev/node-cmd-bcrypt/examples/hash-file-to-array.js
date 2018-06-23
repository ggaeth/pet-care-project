var passwdjs = require('../');

var opts = {
    rounds: 12, // rounds to use (complexity).  see bcryptjs for details. 
};

/**
 * Hash file of passwords, result in array
 */
passwdjs('test/test.txt', opts)
    .on('line', doSomethingWithLine)
    .on('done', doSomethingWithResultsArray)
    .on('error', doSomethingWithError)


function doSomethingWithLine(line) {
    console.log('line =', line);
};

function doSomethingWithResultsArray(results) {
    results.forEach(function (result) {
        console.log("Hash = " + result);
    })
}

function doSomethingWithError(err) {
    console.log(err);
}