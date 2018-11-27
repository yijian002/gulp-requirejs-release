const gulp = require('../node_modules/gulp')
const jshint = require('../node_modules/gulp-jshint')

const comm = require('../lib/comm')

module.exports = function (opts) {
	if (!opts.src) {
        comm.log('Not found the param src.', 'option.jshint')
        return
    }

    gulp.src(comm.setBasePath(opts.src))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
}