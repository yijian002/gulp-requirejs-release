const comm = require('../lib/comm')

module.exports = function* (opts, plugins) {
    if (!opts) {
        return
    }

    if (!opts.src) {
        comm.log('Not found the param src.', 'option.jshint')
        return
    }

    let gulp = plugins.gulp
    let jshint = plugins.jshint

    yield gulp.src(comm.setBasePath(opts.src))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
}
