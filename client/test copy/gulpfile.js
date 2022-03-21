const fs = require("fs");

const { src, dest, watch, lastRun, series, parallel, task } = require("gulp");
const broswerSync = require("browser-sync");
const minifyHtml = require("gulp-minify-html");
const newer = require("gulp-newer");

const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-minify-css");

const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

const concat = require("gulp-concat");
const gutil = require('gulp-util');
const babelify = require("babelify");
const tsify = require("tsify");

const paths = {
  html: {
    src: "public/index.html",
    dest: "dist"
  },
  scss: {
    src: "src/**/*.scss",
    dest: "dist"
  },
  ts: {
    entry: ["src/index.tsx"],
    src: ["src/**/*.tsx"],
    dest: "lib"
  },
  js: {
    src: "lib/index.jsx",
    dest: "dist",
  },
  dest: "dist",
}

const concats = {
  css: "index.css",
  js: "index.js"
}

function cleaner(cb) {
  ["dist", "lib"].forEach(dirPath=>{
    fs.rmdirSync(dirPath, { recursive: true });
  })
  cb();
}

function htmlCopyer(cb) {
  src(paths.html.src)
    .pipe(newer(paths.dest))
    .pipe(minifyHtml())
    .pipe(dest(paths.dest))
    .pipe(broswerSync.reload({ stream: true }));
  cb();
}

function scssCompiler(cb) {
  src(paths.scss.src, { sourcemaps: true, since: lastRun(scssCompiler) })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(concat(concats.css))
    .pipe(dest(paths.dest))
    .pipe(broswerSync.reload({ stream: true }));
  cb();
}

// function tsCompiler(cb) {
//   tsProject.src()
//            .pipe(tsProject()).js
//            .pipe(dest(paths.ts.dest))
//   cb();
// }

function jsBundler(cb) {
  const browserifyOptions = {
    entries: paths.ts.entry,
    debug: true,
    cache: {},
    packageCache: {},
  }

  const babelifyOptions = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }

  const wb = browserify(browserifyOptions).plugin(tsify).transform(babelify, babelifyOptions)

  wb.bundle()
    .on("error", gutil.log)
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true, debug: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(concat(concats.js))
    .pipe(dest(paths.js.dest))
    .pipe(broswerSync.reload({ stream: true }));
  cb();
}

// const jsBuilder = series(tsCompiler, jsBundler);
const jsBuilder = series(jsBundler);

function proxyServer(cb) {
  broswerSync.init({
    server: {
      baseDir: "./dist",
    }
  })
  cb();
}

function watcher(cb) {
  watch(paths.html.src, htmlCopyer);
  watch(paths.scss.src, scssCompiler);
  watch(paths.ts.src, jsBundler);
}

exports.jsbundle = jsBundler;

exports.default = series(
  cleaner,
  parallel(
    htmlCopyer,
    scssCompiler,
    // jsBuilder
    jsBundler,
  ),
  proxyServer,
  watcher,
)