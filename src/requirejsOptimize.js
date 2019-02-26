const comm = require('../lib/comm')

var gulp, requirejsOptimize, sourcemaps

function getDest(filePath, opts) {
    if (opts.setDest) {
        return opts.setDest(filePath)
    }

    return opts.dest
}

function* optimize(filePath, destPath, options) {
    return yield gulp.src(filePath)
        .pipe(requirejsOptimize(options || {}))
        .pipe(gulp.dest(destPath))
}

function* optimizeMaps(filePath, destPath, opts) {
    if(!opts) {
        return
    }

    let mapsOptions = opts.sourcemaps === true || typeof opts.sourcemaps === 'string' ? {} : opts.sourcemaps
    let mapsPath = typeof mapsOptions.writePath === 'function' ? mapsOptions.writePath(filePath) : (mapsOptions.writePath || './')
    let writeOptions = mapsOptions.writeOptions || {}

    return yield gulp.src(filePath)
        .pipe(requirejsOptimize(opts.options || {}))
        .pipe(sourcemaps.init( mapsOptions.initOptions || {} ))
        .pipe(sourcemaps.write( mapsPath, writeOptions ))
        .pipe(gulp.dest(destPath))
}

module.exports = function* (opts, plugins) {
    if (!opts) {
        return
    }

    if (!opts.src) {
        comm.log('Not found the param `src`.', 'Error.options.optimize')
        return
    }

    comm.log('[gulp-requirejs-release] Task `requirejsOptimize` starting.', 'Info')

    // Init plugins
    gulp = plugins.gulp
    requirejsOptimize = plugins.requirejsOptimize
    sourcemaps = plugins.sourcemaps

    if (typeof opts.src === 'string') {
        opts.src = [opts.src]
    }

    for (let i = 0; i < opts.src.length; i++) {
        let filePath = opts.src[i]
        let destPath = getDest(filePath, opts)

        if(opts.sourcemaps) {
            yield* optimizeMaps(comm.setBasePath(filePath, opts.basePath), destPath, opts)
        }
        else {
            yield* optimize(comm.setBasePath(filePath, opts.basePath), destPath, opts.options)
        }
    }

    if(opts.sourcemaps) {
        comm.log('[gulp-requirejs-release] Task `requirejsOptimize` and `sourcemaps` finished.', 'Info')
    }
    else {
        comm.log('[gulp-requirejs-release] Task `requirejsOptimize` finished.', 'Info')
    }
}
