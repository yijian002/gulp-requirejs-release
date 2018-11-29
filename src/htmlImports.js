const comm = require('../lib/comm')

module.exports = function* (settings, plugins) {
    let opts = settings.htmlImports
    if (!opts) {
        return
    }

    if (!opts.src) {
        comm.log('Not found the param `src`.', 'Error.option.htmlImports')
        return
    }

    if (!opts.componentsPath) {
        comm.log('Not found the param `componentsPath`.', 'Error.option.htmlImports')
        return
    }

    // Init plugins
    let gulp = plugins.gulp
    let gulpHtmlImports = plugins.htmlImports

    opts.dest = opts.dest || ''
    if (typeof opts.src === 'string') {
        opts.src = [opts.src]
    }

    yield gulp.src(comm.setBasePath(opts.src))
        .pipe(gulpHtmlImports({
            componentsPath: opts.componentsPath,
            template: opts.template || {}
        }))
        .pipe(gulp.dest(settings.destPath + opts.dest))

    comm.log('Task `htmlImports` finished.', 'Info')
}
