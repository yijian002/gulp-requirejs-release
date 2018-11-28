'use strict'

let gulp = require('gulp')
let plugins = require('gulp-load-plugins')()
let onEndOfStream = require('end-of-stream')
let consumeStream = require('stream-consume')

const jshint = require('./src/jshint')
const requirejsOptimize = require('./src/requirejsOptimize')
const comm = require('./lib/comm')

plugins.gulp = gulp

function arrangeAsyncSteps(iterator, callback) {
    let context = iterator.next()
    if (context.done) {
        callback()
        return
    }

    let asyncStep = context.value
    if (asyncStep && typeof asyncStep.pipe === 'function') {
        // https://github.com/robrich/orchestrator/blob/master/lib/runTask.js
        onEndOfStream(asyncStep, { error: true, readable: asyncStep.readable, writable: asyncStep.writable && !asyncStep.readable }, function(err) {
            if (err) {
                callback(err)
                return
            }
            arrangeAsyncSteps(iterator, callback)
        })

        consumeStream(asyncStep)
    }
    else if (asyncStep && typeof asyncStep.then === 'function') {
        // wait for promise to resolve
        asyncStep.then(function() {
            arrangeAsyncSteps(iterator, callback)
        }, function(err) {
            callback(err)
        })
    }
}

function* optimize(opts) {
    if (!opts.optimize) {
        return
    }

    let setting = opts.optimize
    if (!setting.dest) {
        setting.dest = opts.destPath
    }
    else if (typeof setting.dest === 'function') {
        setting.setDest = function(filePath) {
            return setting.dest(opts.destPath, filePath)
        }
    }

    if(opts.sourcemaps) { // plugins.sourcemaps
        setting.sourcemaps = opts.sourcemaps
    }

    yield* requirejsOptimize(setting, plugins)
}

module.exports = function(opts) {
    if (typeof opts === 'string') {
        comm.log('Options must be object.', 'Error.options')
        return
    }

    if (!opts.destPath) {
        opts.destPath = './'
    }

    // Init the lib/comm.js
    comm.init(opts)
    comm.log('Iterator begin...', 'gulp-requirejs-release')

    // Gulp task arrange async steps
    let iterator = function* () {
        yield* jshint(opts.jshint, plugins)
        yield* optimize(opts)
    }()

    arrangeAsyncSteps(iterator, function(error) {
        if (error) {
            comm.log(error, 'Error.Iterator')
            return
        }

        comm.log('Iterator end...', 'gulp-requirejs-release')
    })
}
