# gulp-requirejs-release

## Usage

### Install

```bash
 $ npm install gulp-requirejs-release --save-dev
```

### Gulpfile

```js
var gulp = require('gulp')
var requirejsRelease = require('gulp-requirejs-release')
```

## Gulp Tasks

### jshint

```js
gulp.task('jshint', function() {
  requirejsRelease({
    jshint: {
      src: 'src/**/*.js'
    }
  })
})
```

### requirejs-optimize

#### Simple

```js
gulp.task('requirejsOptimize', function() {
  requirejsRelease({
    optimize: {
      src: 'src/js/*.js'
      dest: './dist'
    }
  })
})
```

#### Custom options

Accepts almost all of the same options as [r.js optimize](https://github.com/requirejs/r.js/blob/master/build/example.build.js) (see below).

```js
gulp.task('requirejsOptimize', function() {
  requirejsRelease({
    optimize: {
      src: 'src/js/*.js'
      options: {
          optimize: 'none',
          insertRequire: ['foo/bar/bop']
      },
      dest: function(destPath, filePath) {
        // destPath default is "./"
        return destPath
      }
    }
  })
})
```

---

Copyright © 2018 [Vic Yang](https://github.com/yijian002)