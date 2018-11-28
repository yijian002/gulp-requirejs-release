# gulp-requirejs-release

```js
var gulp = require('gulp')
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

## requirejs-optimize

### Simple

```js
gulp.task('default', function() {
  requirejsRelease({
    optimize: {
      src: 'src/js/*.js'
      options: {
          optimize: 'none',
          insertRequire: ['foo/bar/bop']
      },
      dest: './dist'
    }
  })
})
```

### Custom options

gulp-requirejs-optimize accepts almost all of the same options as [r.js optimize](https://github.com/requirejs/r.js/blob/master/build/example.build.js) (see below).

```js
gulp.task('default', function() {
  requirejsRelease({
    optimize: {
      src: 'src/js/*.js'
      options: {
          optimize: 'none',
          insertRequire: ['foo/bar/bop']
      },
      dest: './dist'
    }
  })
})
```