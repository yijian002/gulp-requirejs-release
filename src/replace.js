const comm = require('../lib/comm')

module.exports = function* (settings, plugins) {
    let opts = settings['replace']
    if (!opts) {
        return
    }

    // Init plugins
    const gulp = plugins.gulp
    const gulpReplace = plugins.replace

    comm.log('[gulp-requirejs-release] Task `replace` starting.', 'Info')
    
    let destPath = opts.destPath || settings.destPath

    for (let i = 0; i < opts.list.length; i++) {
        let item = opts.list[i]

        if(!item.src) {
            comm.log('Not found the item['+ i +'] param `src`.', 'Error.option.replace')
            continue
        }

        if(!item['replace'] || item['replace'].length !== 2) {
            comm.log('Not found the item['+ i +'] param `replace` must be `replace.length === 2`.', 'Error.option.replace')
            continue
        }

        item.dest = item.dest || ''

        yield gulp.src(comm.setBasePath(item.src, opts.basePath))
            .pipe(gulpReplace( item['replace'][0], item['replace'][1] ))
            .pipe(gulp.dest(destPath + item.dest))
    }

    if(opts.callback && typeof opts.callback === 'function') {
        yield* opts.callback(gulpReplace)
    }

    comm.log('[gulp-requirejs-release] Task `replace` finished.', 'Info')
}
