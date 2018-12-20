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

    let destPath = opts.destPath || settings.destPath
    opts.dest = opts.dest || ''

    if (typeof opts.src === 'string') {
        opts.src = [opts.src]
    }

    yield gulp.src(comm.setBasePath(opts.src, opts.basePath))
        .pipe(gulpHtmlImports({
            componentsPath: comm.setBasePath(opts.componentsPath, opts.basePath),
            template: opts.template || {},
            restore: opts.restore || false
        }))
        .pipe(gulp.dest(destPath + opts.dest))

    comm.log('[gulp-requirejs-release] Task `htmlImports` finished.', 'Info')
}
