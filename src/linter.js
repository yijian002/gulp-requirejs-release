const comm = require('../lib/comm')

module.exports = function* (settings, plugins) {
    let opts = settings.linter
    if (!opts) {
        return
    }

    if (!opts.src) {
        comm.log('Not found the param src.', 'Error.option.linter')
        return
    }

    // Init plugins
    let gulp = plugins.gulp
    let jshint = plugins.jshint

    yield gulp.src(comm.setBasePath(opts.src))
        .pipe(jshint( opts.options || {} ))
        .pipe(jshint.reporter('default'))

    comm.log('Task `linter` finished.', 'Info')
}
