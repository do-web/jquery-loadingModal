var gulp = require('gulp');
var uglify = require("gulp-uglify");
var uglifycss = require("gulp-uglifycss");
var rename = require('gulp-rename');
var changelog = require('gulp-conventional-changelog');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var eslint = require('gulp-eslint');

gulp.task('min', function() {
  gulp.src('js/jquery.loadingModal.js')
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(rename('js/jquery.loadingModal.min.js'))
    .pipe(gulp.dest('.'));

  gulp.src('css/jquery.loadingModal.css')
    .pipe(uglifycss())
    .pipe(rename('css/jquery.loadingModal.min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('clean-styles', function(cb) {
  del(['css'], cb);
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**','!gulpfile.js','!**/*.min.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('styles', ['clean-styles'], function() {
  return gulp.src('scss/*.scss')
             .pipe(sass({errLogToConsole: true}))
             .pipe(autoprefixer('last 2 versions', {map: false}))
             .pipe(gulp.dest('css'));
});

gulp.task('build', ['styles', 'lint']);

gulp.task('default', ['build']);
gulp.task('watch', ['build'], function() {
  gulp.watch('scss/**/*.scss', ['build']);
});