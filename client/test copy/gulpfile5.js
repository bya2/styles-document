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

const tasks = {
  clean: "clean",
  server: "server",
  html: "minify:html",
  css: "compile:scss",
  ts: "compile:typescript",
  js: "bundle:javascript",
  browser: "browser",
  watch: "watch",
  default: "default",
};

const paths = {
  html: {
    src: "public/**/*.html",
  },
  css: {
    src: "src/styles/**/*.scss",
  },
  ts: {
    src: ["src/**/*.ts", "src/**/*.tsx", "!./node_modules/**/*.ts"],
  },
  js: {
    src: ["lib/**/*.js", "lib/**/*.jsx"],
    entries: ["src/index.tsx"],
  },
  dest: "dist",
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

gulp.task(tasks.clean, () => {
  return ["dist"].forEach(dirPath=>{
    fs.rmdirSync(dirPath, {recursive: true});
  })
});

gulp.task(tasks.html, () => {
  return gulp.src(paths.html.src)
             .pipe(newer(paths.dest))
             .pipe(minifyHTML())
             .pipe(gulp.dest(paths.dest))
             .pipe(browserSync.reload({ stream: true }));
});

gulp.task(tasks.css, () => {
  return gulp.src(paths.css.src, { sourcemaps: true, since: gulp.lastRun(tasks.css)})
             .pipe(sass())
             .pipe(autoprefixer())
             .pipe(minifyCSS())
             .pipe(concat(concats.css))
             .pipe(gulp.dest(paths.dest))
             .pipe(browserSync.reload({ stream: true }));
});

// gulp.task(tasks.ts, () => {
//   return tsProject.src()
//                   .pipe(tsProject()).js
//                   // .pipe(concat("compile.js"))
//                   .pipe(gulp.dest("lib"));
// })

gulp.task(tasks.js, () => {
  const wb = watchify(
    browserify({ entries: paths.js.entries, debug: true, cache: {}, packageCache: {} })
      .plugin(tsify)
  ).transform(babelify, { presets: ["@babel/preset-env", "@babel/preset-react"], extensions: [".js", ".jsx", ".ts", ".tsx"] })

  const bundle = () => {
    return wb.bundle()
             .on("error", gutil.log)
             .pipe(source("bundle.js"))
             .pipe(buffer())
             .pipe(sourcemaps.init({ loadMaps: true, debug: true }))
             .pipe(uglify())
             .pipe(sourcemaps.write("./"))
             .pipe(concat("index.js"))
             .pipe(gulp.dest(paths.dest))
             .pipe(browserSync.reload({ stream: true }));
  }

  wb.on("update", bundle)
  wb.on("log", gutil.log)

  return bundle();
});

gulp.task(tasks.browser, gulp.series(tasks.html, tasks.css, tasks.js), () => {
  return browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: ["chrome"],
  })
});

gulp.task(tasks.watch, () => {
  gulp.watch(paths.html.src, gulp.series(tasks.html));
  gulp.watch(paths.css.src, gulp.series(tasks.css));
  // gulp.watch(paths.js.src, gulp.series(tasks.ts));
});

gulp.task(tasks.default, gulp.series(tasks.browser, tasks.watch));