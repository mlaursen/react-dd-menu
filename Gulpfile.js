var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer-core'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    del = require('del'),
    replace = require('gulp-replace'),
    argv = require('yargs').argv,
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    babelify = require('babelify');
    browserSync = require('browser-sync');

const IS_PRODUCTION = argv.production != null;
const IS_EXAMPLES   = argv.examples != null;

const SRC = './src'
const EXAMPLES = './examples'
const DIST = './dist'
const CURR_DIST = IS_EXAMPLES ? EXAMPLES : DIST
const SCSS = IS_EXAMPLES ? '/scss_example' : '/scss'

const MAIN = IS_EXAMPLES ? 'js/main.js' : 'index.js'
const LIBS = IS_EXAMPLES ? 'js/libs.js' : 'libs.js'

const PROD_CONFIG = {
  sass: { outputStyle: 'compressed' },
  browserify: {}
};

const DEV_CONFIG = {
  sass: { outputStyle: 'expanded', sourceMap: true },
  browserify: { debug: true },
};

const CONFIG = IS_PRODUCTION ? PROD_CONFIG : DEV_CONFIG;


const EXTERNALS = [
  { require: 'react' },
  { require: 'react/addons' },
  { require: 'classnames' },
];

// =============================================
// Gulp tasks


  /* Clean the dist folder */
gulp.task('clean', function() {
  return del([DIST, EXAMPLES]);
});


  /* Compile the scss files, copy to dist folder, and if not production, auto inject css instead of reload */
gulp.task('styles', function() {
  gulp.src(SRC + SCSS+'/*.scss')
    .pipe(sass(CONFIG.sass))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version']
      }),
    ]))
    .pipe(gulpif(IS_PRODUCTION, rename({ suffix: '.min' })))
    .pipe(gulp.dest(CURR_DIST))
    .pipe(gulpif(!IS_PRODUCTION, browserSync.stream()));
});
gulp.task('styles-watch', ['styles']);





/*
 * Helper function for bundling apps and libs. Pass
 * in the bundle browerserify bundle you want to bundle, the bundled filename,
 * and type of this bundle (libs, main, etc).
 *
 * If this is production, the bundle will be minified and renamed to have a '.min' prefix.
 */
function bundle(b, fileName, type) {
  return b.bundle()
    .on('error', function(err) {
      console.error('[' + type + ' ERROR]', err.message);
      this.emit('end');
    })
    .pipe(source(fileName))
    .pipe(buffer())
    .pipe(gulpif(IS_PRODUCTION, uglify()))
    .pipe(gulpif(IS_PRODUCTION, rename({ suffix: '.min' })))
    .pipe(gulp.dest(CURR_DIST));
}

  /* Bundle the libs scripts to be used from the main app */
gulp.task('libs-scripts', function() {
  if(!IS_EXAMPLES) {
    return;
  }

  var vendors = browserify();
  EXTERNALS.forEach(function(external) {
    if(external.expose) {
      vendors.require(external.require, { expose: external.expose });
    } else {
      vendors.require(external.require);
    }
  });

  return bundle(vendors, LIBS, 'LIBS');


});
gulp.task('libs-scripts-watch', ['libs-scripts'], browserSync.reload);


  /* Bundles the main script, distributes it, and adds references to the libs */
gulp.task('scripts', function() {
  if(!IS_EXAMPLES) {
    return gulp.src(SRC + '/' + MAIN)
      .pipe(babel())
      .pipe(gulpif(IS_PRODUCTION, uglify()))
      .pipe(gulpif(IS_PRODUCTION, rename({ suffix: '.min' })))
      .pipe(gulp.dest(CURR_DIST));
  }

  var b = browserify(CONFIG.browserify);
  b.add(SRC + '/' + MAIN);
  b.transform(babelify);

  EXTERNALS.forEach(function(external) {
    if(external.expose) {
      b.external(external.expose);
    } else {
      b.external(external.require);
    }
  });
  
  return bundle(b, MAIN, 'MAIN');
});
gulp.task('scripts-watch', ['scripts'], browserSync.reload);


  /* Distribute the application with all files into the dist folder */
gulp.task('dist', ['scripts', 'libs-scripts', 'styles', 'statics']);


gulp.task('statics', function() {
  if(!IS_EXAMPLES) {
    return;
  }

  gulp.src([SRC + '/index.html'])
    .pipe(gulp.dest(CURR_DIST));

  if(!IS_PRODUCTION) {
    return;
  }

  return gulp.src(SRC + '/index.html')
    .pipe(replace(/(\.(js|css))/g, '.min$1'))
    .pipe(gulp.dest(CURR_DIST));
});


  /* Start up browsersync and start watching files */
gulp.task('serve', ['dist'], function() {
  browserSync({
    server: {
      baseDir: CURR_DIST
    }
  });

  gulp.watch(SRC + '/**/*.js', ['scripts-watch']);
  gulp.watch(SRC + '/**/*.scss', ['styles-watch']);
});


gulp.task('default', ['dist']);
