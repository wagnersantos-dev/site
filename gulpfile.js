var gulp = require('gulp');
//var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cleanCSS = require('gulp-clean-css'); // minify css
var htmlmin = require('gulp-htmlmin'); // minify html

var paths = {
  scripts: ['dev/assets/js/**/*.js'],
  images: ['dev/assets/images/**/*'],
  css: ['dev/assets/css/**/*'],
  html: ['dev/*.html']
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {  
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())      
    .pipe(uglify())      
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['clean'], function() {  
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())      
    .pipe(cleanCSS({compatibility: 'ie8'}))      
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', ['clean'], function() {  
  return gulp.src(paths.html)
    .pipe(sourcemaps.init())      
      .pipe(htmlmin({collapseWhitespace: true}))      
    .pipe(gulp.dest('build'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)   
    .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true
    }))
    .pipe(gulp.dest('build/images'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watch', 'scripts', 'images', 'css', 'html']);
