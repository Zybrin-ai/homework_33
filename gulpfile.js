const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const paths = {
  html: "src/*.html",
  scss: "src/scss/*.scss",
  js: "src/js/*.js",
};
function html() {
  return gulp
    .src(paths.html)
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}
function styles() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}
function scripts() {
  return gulp
    .src(paths.js)
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(paths.html, html);
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts);
}
exports.default = gulp.series(gulp.parallel(html, styles, scripts), watch);
