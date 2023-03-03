#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const JSONCalc = require("./json-calc")

const argv = yargs(hideBin(process.argv)).option('all-or-nothing', {
    alias: 'a',
    type: 'boolean',
    description: 'Takes only fields into account that exist as number in each object.'
}).parse()


const inputChunks = []

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function (chunk) {
    inputChunks.push(chunk)
});

process.stdin.on('end', function () {
    var inputJSON = inputChunks.join()
    parsedData = JSON.parse(inputJSON)

    const sumObj = new JSONCalc().calc(parsedData, {
        allOrNothing: argv["all-or-nothing"]
    })

    process.stdout.write(JSON.stringify(sumObj))
})