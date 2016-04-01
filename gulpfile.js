var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    postcssimport = require('postcss-import');
    precss = require('precss'),
    concat = require('gulp-concat'),
    htmlMin = require('gulp-htmlmin'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');


gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  var processors = [
    autoprefixer,
    cssnext,
    precss
  ];
  return gulp.src([
      './node_modules/normalize.css/normalize.css',
      './src/css/main.css'
    ])
    .pipe(concat('main.css'))
    .pipe(postcss(processors))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src('.src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/css/**/*', ['css']);
  gulp.watch('./src/js/**/*', ['js']);
});

gulp.task('default', ['html', 'css', 'js']);
