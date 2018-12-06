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

### replace

```js
requirejsRelease({
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

## API

| Option| Type| Default| Description  |
| ------|-----|--------|--------------|
| `basePath` | String | `./` |  |
| `destPath` | String | `./` |  |
| `copy` | Object |  | [Plugin Options](#copy-options) |
| `linter` | Object |  | [Plugin Options](#linter-options)|
| `replace` | Object |  | [Plugin Options](#replace-options) |
| `optimize` | Object |  | [Plugin Options](#optimize-options) |
| `sourcemaps` | Object or Boolean |  | [Plugin Options](#sourcemaps-options) |

### Copy options

| Name | Type| Description  |
| ------|-----|--------------|
| `src` | String or Array |  |

### Linter options

| Name | Type| Description  |
| ------|-----|--------------|
| `src` | String or Array |  |
| `options` | Object |  |

### Replace options

| Name | Type| Description  |
| ------|-----|--------------|
| `basePath` | String |  |
| `destPath` | String |  |
| `list` | Array | `[ {src: '**.*', replace: ['str1', 'str2'], dest: ''} ]` |
| `callback` | Function* |  |

### Optimize options

| Name | Type| Description  |
| ------|-----|--------------|
| `basePath` | String |  |
| `src` | String or Array |  |
| `options` | Object or Function |  |
| `dest` | String or Function |  |

### Sourcemaps options

| Name | Type| Description  |
| ------|-----|--------------|
|  | Boolean | Default is `false` |
| `initOptions` | Object |  |
| `writePath` | String |  |
| `writeOptions` | Object |  |

---

Copyright © 2018 [Vic Yang](https://github.com/yijian002)