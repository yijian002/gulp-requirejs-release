const comm = require('../lib/comm')

var gulp, requirejsOptimize

function dest(file, opts) {
    if (opts.setDest) {
        return opts.setDest(file)
    }

    return opts.dest
}

module.exports = function* (opts, plugins) {
    if (!opts) {
        return
    }

    if (!opts.src) {
        comm.log('Not found the param src.', 'option.optimize')
        return
    }

    gulp = plugins.gulp
    requirejsOptimize = plugins.requirejsOptimize

    if (typeof opts.src === 'string') {
        opts.src = [opts.src]
    }

    for (let i = 0; i < opts.src.length; i++) {
        let file = opts.src[i]
        let destPath = dest(file, opts)

        yield gulp.src(comm.setBasePath(file))
            .pipe(requirejsOptimize(opts.options || {}))
            .pipe(gulp.dest(destPath))
    }
}
