const gulp = require("gulp");
const { src, dest, watch, lastRun, series, parallel, task } = gulp;

const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const minifyHTML = require("gulp-minify-html");

const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-clean-css");

const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require("babelify");
const tsify = require("tsify");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const fancyLog = require("fancy-log");

const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const plumber = require("gulp-plumber"); // 오류 처리

// 증분 빌드
const newer = require("gulp-newer");
const cached = require("gulp-cached");
const remember = require("gulp-remember");

const tasks = {
  server: "server",
  html: "build:html",
  css: "build:css",
  js: "build:javascript",
  watch: "watch",
  default: "default",
};

const paths = {
  html: {
    src: "public/**/*.html",
    dest: "dist",
  },
  css: {
    src: "src/styles/**/*.scss",
    dest: "dist",
  },
  js: {
    entry: "src/index.tsx",
    dest: "dist",
  },
};

const options = {
  scss: {
    outputStyle: "expanded",
    indentType: "tab",
    indentWidth: 1,
    precision: 3,
    sourceCommnets: false,
  },
};
const concats = {
  css: "style.css",
  js: "index.js",
};

task(tasks.html, () => {
  return src(paths.html.src)
    .pipe(newer("dist"))
    .pipe(minifyHTML())
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.reload({ stream: true }));
});

task(tasks.css, () => {
  return src(paths.css.src, { sourcemaps: true, since: lastRun(tasks.css) })
    .pipe(sourcemaps.init({ logMaps: true, debug: true }))
    .pipe(cached("css"))
    .pipe(sass(options.scss).on("error", fancyLog))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write("./"))
    .pipe(concat(concats.css))
    .pipe(dest(paths.css.dest, { sourcemaps: true }))
    .pipe(browserSync.reload({ stream: true }));
});

task(tasks.js, () => {
  const tg = watchify(
    browserify({ baseDir: ".", entries: paths.js.entry, debug: true, cache: {}, packageCache: {} }).plugin(tsify)
  ).transform(babelify, {
    presets: ["@babel/preset-react", "@babel/preset-env"],
    extensions: [".tsx", ".ts"],
  });

  const bundle = function () {
    return tg
      .bundle()
      .on("error", fancyLog)
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ logMaps: true, debug: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(concat(concats.js))
      .pipe(dest(paths.js.dest))
      .pipe(browserSync.reload({ stream: true }));
  };

  tg.on("update", bundle);
  ``;
  tg.on("log", fancyLog);

  return bundle();
});

task(tasks.server, parallel(tasks.html, tasks.css, tasks.js), () => {
  return browserSync.init({
    server: {
      baseDir: ".",
    },
    // serveStatic: ["./dist"],
    // startPath: "./dist/index.html",
    // proxy: "http://localhost:8080/",
  });
});

task(tasks.watch, () => {
  watch(paths.html.src, series(tasks.html));
  watch(paths.css.src, series(tasks.css));
});

task("default", series(parallel(tasks.server, tasks.watch)));
