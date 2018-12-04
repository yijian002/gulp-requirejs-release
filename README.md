# gulp-requirejs-release

- A gulp plugin.
- The project Use `requirejs`.
- Build release environment.

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

```js
gulp.task('build', function() {
  requirejsRelease({
    // To do something...
  })
})
```

### copy

Copy source files to new destination.

```js
requirejsRelease({
  copy: {
    src: './src/**',
    dest: './dest'
  }
})
```

### linter

```js
requirejsRelease({
  linter: {
    src: 'src/**/*.js',
    options: { linter: 'some-jshint-module' } // Default is "jshint"
  }
})
```

### requirejs-optimize

Optimize AMD modules in javascript files using the requirejs optimizer.

#### Simple

```js
requirejsRelease({
  optimize: {
    src: 'src/js/*.js',
    dest: './dist'
  }
})
```

#### Custom options

Accepts almost all of the same options as [r.js optimize](https://github.com/requirejs/r.js/blob/master/build/example.build.js) (see below).

```js
requirejsRelease({
  optimize: {
    src: 'src/js/*.js',
    options: {
        optimize: 'none',
        insertRequire: ['foo/bar/bop']
    },
    dest: function(destPath, filePath) {
      // Default is "./"
      return destPath
    }
  }
})

// Or
requirejsRelease({
  optimize: {
    src: 'src/js/*.js',
    options: function(file) {
      return {
        name: '../vendor/bower/almond/almond',
        optimize: 'none',
        useStrict: true,
        baseUrl: 'path/to/base',
        include: 'subdir/' + file.relative
      }
    },
    dest: function(destPath, filePath) {
      // Default is "./"
      return destPath
    }
  }
})
```

### sourcemaps

#### Simple

```js
requirejsRelease({
  optimize: {
    src: 'src/js/*.js',
    dest: './dist'
  },
  sourcemaps: true
})
```

* Map file path: `"./dist/*.js.map"`

#### Custom options

```js
requirejsRelease({
  optimize: {
    src: 'src/js/*.js',
    dest: './dist'
  },
  sourcemaps: {
    initOptions: {largeFile: true},
    writePath: '../maps',
    writeOptions: {addComment: false}
  }
})
```

### html-imports

* Import html files into html files.
* [What is this ?](https://www.npmjs.com/package/gulp-html-imports)

```js
requirejsRelease({
  htmlImports: {
    src: 'src/*.html',
    componentsPath: './components/',
    template: {
      '_VERSION_': '2018'
    }
  }
})
```

## Example

A complete example

### gulpfile.js

```js

// GulpRequirejsRelease options
var options = {
  basePath: './src/',
  destPath: './dest/',
  copy: {
    src: '**'
  },
  linter: {
    src: 'js/**/*.js'
  },
  replace: {
    list: [{
      src: '*.html',
      replace: ['__VERSION__', '2018'],
    }, {
      src: 'css/*.css',
      replace: [/\.\.\/img\/(.+?)\.(jpg|png)/g, function(match, p1) {
        return '//IMG_HOST/img/' + p1 + '.' + match.split('.').pop()
      }],
      dest: 'css'
    }]
  },
  optimize: {
    src: 'js/app/**/*.js',
    options: {
      baseUrl: './dest/',
      mainConfigFile: './dest/js/config.json'
    },
    dest: function(destPath, filePath) {
      return destPath + 'js/release'
    }
  },
  sourcemaps: true
}

// Task build
var gulp = require('gulp')
var requirejsRelease = require('gulp-requirejs-release')

gulp.task('build', function() {
  requirejsRelease(options)
})
```

### Bash

```bash
$ gulp build
```

---

Copyright © 2018 [Vic Yang](https://github.com/yijian002)