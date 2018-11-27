'use strict'

const comm = require('./lib/comm')
const jshint = require('./src/jshint')

module.exports = function(opts) {
    if (typeof opts === 'string') {
        comm.log('Options must be object.', 'Error option')
        return
    }

    comm.init(opts)

    if (opts.jshint) {
        jshint(opts.jshint)
    }
}
