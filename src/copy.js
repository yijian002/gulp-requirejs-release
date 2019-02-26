const comm = require('../lib/comm')

module.exports = function* (settings, plugins) {
    let opts = settings.copy
    if (!opts) {
        return
    }

    if (!opts.src) {
        comm.log('Not found the param `src`.', 'Error.option.copy')
        return
    }
    
    opts.dest = opts.dest || ''

    comm.log('[gulp-requirejs-release] Task `copy` starting.', 'Info')
    
    // Init plugins
    let gulp = plugins.gulp

    yield gulp.src(comm.setBasePath(opts.src))
        .pipe(gulp.dest( settings.destPath + opts.dest ))

    comm.log('[gulp-requirejs-release] Task `copy` finished.', 'Info')
}
