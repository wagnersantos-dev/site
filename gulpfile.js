var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cleanCSS = require('gulp-clean-css'); // minify css
var htmlmin = require('gulp-htmlmin'); // minify html
var webserver = require('gulp-webserver'); // server

var paths = {
  scripts: ['dev/assets/js/**/*.js'],
  images: ['dev/assets/images/**/*'],
  css: ['dev/assets/css/**/*.css'],
  html: ['dev/*.html'],
  video: ['dev/assets/video/**/*']
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {  
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())      
    .pipe(uglify())      
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('css', ['clean'], function() {  
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())      
    .pipe(cleanCSS({compatibility: 'ie8'}))      
    .pipe(gulp.dest('build/assets/css'));
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
    .pipe(gulp.dest('build/assets/images'));
});

gulp.task('video', ['clean'], function() {
  return gulp.src(paths.video)    
    .pipe(gulp.dest('build/assets/video'));
});

gulp.task('webserver', function() {
  gulp.src('dev')
    .pipe(webserver({
      //livereload: true,      
      port: 3000,      
      fallback: 'index.html',
      open: 'elo7'
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.html, ['video']);
});

gulp.task('default', ['watch', 'scripts', 'images', 'css', 'html', 'video']);
