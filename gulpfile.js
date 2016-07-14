var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var templateData = require('./data/data.json');

console.log(templateData.name);

// TASK: server
// ------------------------------------------------
gulp.task('server', ['build'], function() {
  return browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

// TASK: sass
// ------------------------------------------------
gulp.task('sass', function() {
  return gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// TASK: clean
// ------------------------------------------------
gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

// TASK: handlebars
// ------------------------------------------------
gulp.task('handlebars', function() {
  return gulp.src('src/*.handlebars')
    .pipe(handlebars(templateData, {
      ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      batch: ['./src/partials'],
    }))
    .pipe(rename(function(path) {
      path.extname = ".html";
      return path;
    }))
    .pipe(gulp.dest('dist'));
});

// TASK: watch
// ------------------------------------------------
gulp.task('watch', function() {
  gulp.watch("src/**/*.handlebars", ['handlebars']);
  gulp.watch("src/**/*.scss", ['sass']);
  gulp.watch("dist/*.html", reload);
});

// ------------------------------------------------
// TASKS
// ------------------------------------------------
gulp.task('build', ['handlebars', 'sass'])
gulp.task('default', ['watch', 'build', 'server']);
