import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch } = pkg

// import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import nodeSass from 'sass'
import pug from 'gulp-pug'
import webpack from 'webpack-stream'
import browsersync from 'browser-sync'
import responsive from 'gulp-responsive'


import config from './webpack.config.js'

const sass = gulpSass(nodeSass)

// browsersync.create()

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: './dist/',
    },
    notify: false,
    open: false,
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', function (req, res) {
          res.writeHead(302, {
            location: 'error.html',
          })
          res.end('Redirecting!')
        })
      },
    },
  })

  watch('./dist', browserSync.reload)
}

const html = () => {
  // return gulp
  //   .src('./src/njk/**/*.njk')
  //   .pipe(
  //     nunjucksRender({
  //       path: [
  //         'src/njk/layout/',
  //         'src/njk/components/',
  //         'src/njk/sections/',
  //         'src/njk/ui/',
  //         'src/njk/mixins/',
  //       ],
  //     })
  //   )
  //   .pipe(gulp.dest('./dist'))
  //   .pipe(browsersync.stream())
  return src('./src/pug/pages/*.pug')
    .pipe(pug())
    .pipe(dest('./dist'))
    .pipe(browsersync.stream())
}

const style = () => {
  return src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(dest('./dist'))
    .pipe(browsersync.stream())
}

const script = () => {
  return src('./src/js/main.js')
    .pipe(webpack(config))
    .pipe(dest('./dist'))
    .pipe(browsersync.stream())
}

const image = () => {
  return src('./src/img/**/*').pipe(dest('./dist/img'))
}

const convert = () => {
  return src('./src/img/**/*.png')
    .pipe(responsive({
      // produce multiple images from one source
      '**/*.png': [
        {
          width: '100%',
          height: '100%',
          format: 'webp',
          rename: {
            suffix: '-1x',
            extname: '.webp'
          }
        },
        {
          withoutEnlargement: false,
          width: '200%',
          height: '200%',
          format: 'webp',
          rename: {
            suffix: '-2x',
            extname: '.webp'
          }
        },
        {
          withoutEnlargement: false,
          width: '300%',
          height: '300%',
          format: 'webp',
          rename: {
            suffix: '-3x',
            extname: '.webp'
          }
        }
      ]
      })
    )
    .pipe(dest('./dist/img'))
}

const font = () => {
  return src('./src/font/**/*').pipe(dest('./dist/font/'))
}

const resource = () => {
  return src('./src/resource/**/*').pipe(dest('./dist/'))
}

const build = done => {
  html()
  style()
  script()
  image()
  font()
  resource()
  done()
}

export { html, style, script, image, font, browserSync, build, convert }

export default () => {
  html()
  style()
  script()
  image()
  font()
  resource()
  browserSync()
  // watch('./src/njk/**/*.njk', html)
  watch('./src/pug/**/*.pug', html)
  watch('./src/scss/**/*.scss', style)
  watch('./src/js/**/*.js', script)
  watch('./src/img/**/*', image)
  watch('./src/font/**/*', font)
  watch('./src/resource/**/*', resource)
}
