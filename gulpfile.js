"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var gulpUglify = require("gulp-uglify");
var pipeline = require('readable-stream').pipeline;
var concat = require('gulp-concat');

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("minjs", function() {
  return gulp.src(['source/js/libs/jquery.js',
'source/js/libs/slick.js',
'source/js/libs/picturefill.js',
'source/js/common.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest('source/js'))
});

// gulp.task('concatLibs', function() {
//   return gulp.src(['source/js/libs/**/*', 'source/js/*.js'])
//   .pipe(concat('allLibs.js'))
//   .pipe(gulp.dest('source/js'));
// });

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
		imagemin.svgo()
	]))
	.pipe(gulp.dest("source/img"))
});

gulp.task("webp", function() {
	return gulp.src("souce/img/**/.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"))
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
	.pipe(posthtml([
      include()
		]))
	.pipe(gulp.dest("build"))
});



gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    // "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
})

gulp.task("clean", function(){
  return del("build");
})

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    browser: 'chrome',
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/js/common.js", gulp.series("minjs"));
  gulp.watch("source/*.html").on("change", server.reload);
  gulp.watch("source/js/*.js").on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "css", "minjs",  "sprite", "html"))
gulp.task("start", gulp.series("build", "server"));
