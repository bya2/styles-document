const fs = require("fs");
const path = require("path");

const gulp = require("gulp");
const { src, dest, watch, lastRun, series, parallel, task } = gulp;

const del = require("del");

const ts = require("gulp-typescript");
const tsConfig = require("./tsconfig.json");
const tsProject = ts.createProject("tsconfig.json");

const browserSync = require("browser-sync").create();
const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require("babelify");
const tsify = require("tsify");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const gutil = require('gulp-util');
const fancyLog = require("fancy-log");

const minifyHTML = require("gulp-minify-html");

const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-minify-css");

// const imagemin = require('gulp-imagemin');

const concat = require("gulp-concat");
const plumber = require("gulp-plumber");

// 증분 빌드
const newer = require("gulp-newer");
const cached = require("gulp-cached");
const remember = require("gulp-remember");

const paths = {
  html: {
    src: "public/**/*.html",
    dest: "dist",
  },
  css: {
    src: "src/styles/**/*.scss",
    dest: "dist",
  },
  ts: {
    src: ["src/**/*.ts", "src/**/*.tsx", "!./node_modules/**/*.ts"],
    dest: "dist",
  },
  js: {
    entries: ["dist/index.jsx"],
    dest: "dist",
  },
}

const concats = {
  css: "index.css",
  js: "index.js",
}

const options = {
  plumber: {
    errorHandler: (err) => {
      console.error(err);
    }
  }
}

function clean(cb) {
  ["dist"].forEach(dir_path => {
    // fs.rm(dir_path, { recursive: true, force: true });
    fs.rmdirSync(dir_path, { recursive: true });
  });

  cb();
}

function copyHTML(cb) {
  gulp.src(paths.html.src)
      .pipe(newer("dist"))
      .pipe(minifyHTML())
      .pipe(gulp.dest(paths.html.dest));
  cb();
}

function compileSCSS(cb) {
  gulp.src(paths.css.src, { sourcemaps: true, since: gulp.lastRun(compileSCSS)})
      .pipe(plumber(options.plumber))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minifyCSS())
      .pipe(concat(concats.css))
      .pipe(gulp.dest(paths.css.dest));
  cb();
}

const buildHTML = gulp.series(copyHTML, compileSCSS);


function compileTs(cb) {
  // gulp.src(paths.ts.src)
  //     .pipe(ts(tsConfig.compilerOptions))
  //     .pipe(gulp.dest(paths.ts.dest));

  tsProject.src()
           .pipe(tsProject()).js
           .pipe(gulp.dest(paths.ts.dest))

  cb();
}

function doBrowserify(cb) {
  const b = browserify({
    entries: paths.js.entries,
    debug: true,
  }).transform(babelify.configure({
    presets: ["es2015", "react"],
  }))

  b.bundle()
   .on("error", gutil.log)
   .pipe(source("bundle.js"))
   .pipe(buffer())
   .pipe(sourcemaps.init({ logMaps: true, debug: true }))
   .pipe(uglify())
   .pipe(sourcemaps.write("./"))
   .pipe(concat(concats.js))
   .pipe(gulp.dest(paths.js.dest));

  cb();
}

const compileAndBrowserify = gulp.series(compileTs, doBrowserify);

function build(cb) {
  gulp.series(
    clean, buildHTML, compileAndBrowserify
  )();
  
  cb();
}

exports.clean = clean;
exports.copyHTML = copyHTML;
exports.compileSCSS = compileSCSS;
exports.compileTs = compileTs;
exports.doBrowserify = doBrowserify;

exports.default = build;

// exports.watch = gulp.task("watch", () => {
//   gulp.watch()
// })


