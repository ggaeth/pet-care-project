var execFile = require('child_process').execFile;
var bcrypt = require('bcryptjs');
var chai = require('chai');
var expect = chai.expect;
var passwdjs = "./bin/passwdjs.js";

var errObj = null;
var outStr = null;
var errStr = null;
var optObj = null;
var hashes = null;
var args = [];

describe("Run command line with a single password", function () {
    before(function (done) {
        reset({
            password: 'password1'
        });
        run(done);
    })
    it("should hash the password and send to stdout", function () {
        expect(errObj).to.be.null;
    })
})
describe("Run command retun an error", function () {
    before(function (done) {
        reset({
            file: "./test/xxxx"
        })
        run(done);
    })
    it("should return a file error", function () {

        expect(errStr).to.be.a('string');

    })
})

describe("Run command to hash a file of passwords into lines", function () {
    before(function (done) {
        reset({
            file: "./test/test.txt"
        })
        run(done);
    })
    it("should hash the file of passwords", function () {
        expect(errObj).to.be.null;
        expect(hashes).to.be.an('array');
    })
})

describe("Run command to hash a file of passwords into json", function () {
    before(function (done) {
        reset({
            file: "./test/test.txt",
            json: true
        })
        run(done);
    })
    it("should hash the file of passwords", function () {
        expect(errObj).to.be.null;
        expect(hashes).to.be.an('object');
    })
})


function reset(options) {
    errObj = null;
    outStr = null;
    errStr = null;
    optObj = options;

    args = ['hash'];
    if (options.password) args.push(options.password);
    if (options.file) {
        args.push('-f');
        args.push(options.file);
    }
    if (options.json) {
        args.push('-j');
    }
}

function run(done) {
    execFile(passwdjs, args, function (err, stdout, stderr) {
        errObj = err;
        outStr = stdout;
        errStr = stderr;
        if (optObj.json) hashes = JSON.parse(outStr);
        else hashes = outStr.split('\n');
        done()
    })
}