const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const extender = require('gulp-html-extend');
const watch = require('gulp-watch');

const mainDest = './dist/';

const jsFiles = [
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './src/js/**/*.js'
];
const sassFiles = './src/sass/**/*.scss';
const htmlFiles = './src/html/**/*.html';
const imageFiles = './src/img/**/*';

const jsDest = mainDest + '/js';
const cssDest = mainDest + '/css';
const imageDest = mainDest + '/img';
const htmlDest = mainDest;

gulp.task('sass', function () {
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // {outputStyle: 'compressed'}
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest));
});

gulp.task('sass:watch', function() {
    gulp.watch(sassFiles, ['sass']);
});

gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('js:watch', function() {
    gulp.watch(jsFiles, ['js']);
});

gulp.task('html:extend', function () {
    return gulp.src(htmlFiles)
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(htmlDest))
})

gulp.task('html:watch', function() {
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('images', function() {
    return gulp.src(imageFiles)
        .pipe(gulp.dest(imageDest));
})

gulp.task('styles', ['sass']);
gulp.task('scripts', ['js']);
gulp.task('html', ['html:extend']);

gulp.task('watch-html', ['html:watch']);
gulp.task('watch-scripts', ['js:watch']);
gulp.task('watch-styles', ['sass:watch']);

gulp.task('default', ['html', 'scripts', 'styles', 'images']);
gulp.task('watch', ['watch-html', 'watch-scripts', 'watch-styles'])
