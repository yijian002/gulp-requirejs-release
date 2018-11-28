'use strict'

let gulp = require('gulp')
let plugins = require('gulp-load-plugins')()
let onEndOfStream = require('end-of-stream')
let consumeStream = require('stream-consume')

const jshint = require('./src/jshint')
const requirejsOptimize = require('./src/requirejsOptimize')
const comm = require('./lib/comm')

plugins.gulp = gulp

function arrangeAsyncSteps(gen, cb) {
    var context = gen.next();
    if (context.done) { cb();
        return; }

    var asyncStep = context.value;
    if (asyncStep && typeof asyncStep.pipe === 'function') {
        // consume and wait for completion of a stream: https://github.com/robrich/orchestrator/blob/master/lib/runTask.js
        onEndOfStream(asyncStep, { error: true, readable: asyncStep.readable, writable: asyncStep.writable && !asyncStep.readable }, function(err) {
            if (err) { cb(err);
                return; }
            arrangeAsyncSteps(gen, cb);
        });
        consumeStream(asyncStep);
    } else if (asyncStep && typeof asyncStep.then === 'function') {
        // wait for promise to resolve
        asyncStep.then(function() {
            arrangeAsyncSteps(gen, cb);
        }, function(err) {
            cb(err);
        });
    }
}

function* optimize (opts) {
    if (!opts.optimize) {
        return
    }

    let setting = opts.optimize
    if (!setting.dest) {
        setting.dest = opts.destPath
    } else if (typeof setting.dest === 'function') {
        setting.setDest = (file) => {
            return setting.dest(opts.destPath, file)
        }
    }

    yield* requirejsOptimize(setting, plugins)
}

module.exports = function(opts) {
    if (typeof opts === 'string') {
        comm.log('Options must be object.', 'Error option')
        return
    }

    if (!opts.destPath) {
        opts.destPath = './'
    }

    // Init the lib/comm.js
    comm.init(opts)
    comm.log('Begin iterator.', 'gulp-requirejs-release')

    // Gulp task arrange async steps
    let iterator = function* () {
        yield* jshint(opts.jshint, plugins)
        yield* optimize(opts)
    }

    arrangeAsyncSteps(iterator())

    // gulp-jshint
    // if (opts.jshint) {
    //     jshint(opts.jshint, plugins)
    // }

    // // gulp-requirejs-optimize
    // if (opts.optimize) {
    //     let setting = opts.optimize

    //     if (!setting.dest) {
    //         setting.dest = opts.destPath
    //     } else if (typeof setting.dest === 'function') {
    //         setting.setDest = (file) => {
    //             return setting.dest(opts.destPath, file)
    //         }
    //     }

    //     requirejsOptimize(opts.optimize, plugins)
    // }
}
