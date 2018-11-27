# gulp-requirejs-release

```js
var requirejsRelease = require('gulp-requirejs-release')
```

## jshint

```js
gulp.task('default', function() {
	requirejsRelease({
		jshint: {
			src: 'src/**/*.js'
		}
	})
})
```