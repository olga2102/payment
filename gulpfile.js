const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const sync = require("browser-sync").create();
const concat = require('gulp-concat');
const svgstore = require("gulp-svgstore");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
};

const concatMain = () => {
  return gulp.src('source/js/main-*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'));
};

exports.concatMain = concatMain;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("build/img"));
};

exports.images = images;

const sprite = () => {
  return gulp.src("source/img/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.sprite = sprite;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

exports.createWebp = createWebp;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
  ], {
    base: "source",
  })
    .pipe(gulp.dest("build"));
  done();
};

exports.copy = copy;

const clean = () => {
  return del("build");
};


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/main.js", gulp.series(concatMain));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// Build
const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    concatMain,
    copy,
    images,
    sprite,
    createWebp,
  ));

exports.build = build;

exports.default = gulp.series(
  build,
  gulp.series(
    server,
    watcher,
  ));

// const gulp = require("gulp");
// const plumber = require("gulp-plumber");
// const sourcemap = require("gulp-sourcemaps");
// const sass = require("gulp-sass");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
// const sync = require("browser-sync").create();

// // Styles

// const styles = () => {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("source/css"))
//     .pipe(sync.stream());
// }

// exports.styles = styles;

// // Server

// const server = (done) => {
//   sync.init({
//     server: {
//       baseDir: 'source'
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }

// exports.server = server;

// // Watcher

// const watcher = () => {
//   gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
//   gulp.watch("source/*.html").on("change", sync.reload);
// }

// exports.default = gulp.series(
//   styles, server, watcher
// );
