// 모듈
const { src, dest, watch, lastRun, series, parallel } = require("gulp");

const browserSync = require("browser-sync");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const minifyHTML = require("gulp-minify-html");

const sass = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-clean-css");

const uglify = require("gulp-uglify");
const terser = require("gulp-terser");

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");

const tsify = require("tsify");
const ts = require("gulp-typescript");
const tsProject = ts.createProejct("tsconfig.json");

const errorHandler = function (err) {
  console.error(err);
  this.emit("end");
};

const paths = {
  html: {
    src: "public/**/*.html",
    dest: "dist",
  },
  css: {
    src: "src/styles/**/*.scss",
    dest: "dist/css",
  },
  js: {
    src: "src/index.js",
    dest: "dist/scripts",
  },
  img: {
    src: "src/images/**/*.{jpg,png}",
    dest: "dist/images",
  },
  webp: {
    src: "dist/images/**/*.{jpg,png}",
    dest: "dist/images",
  },
};

const options = {
  scss: {
    outputStyle: "expanded",
    sourceComments: false,
  },
  plumber: {
    errorHandler,
  },
};

const concats = {
  css: "style.css",
  js: "index.js",
};

function browserHandler() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

// HTML
function htmlHandler() {
  return src(paths.html.src) // Task 대상이 되는 파일들 지정 - 파일을 읽어 vinyl object로 변환
    .pipe(plumber(options.plumber)) // 오류 처리
    .pipe(minifyHTML()) // 코드 경량화
    .pipe(dest(paths.html.dest)) // Task의 결과물이 저장될 경로 지정
    .pipe(browserSync.reload({ stream: true })); // BroswerSync로 브라우저에 반영
}

// SCSS
function stylesHandler() {
  return src(paths.css.src, { sourcemaps: true }) // Task 대상이 되는 파일들 지정 - 파일을 읽어 vinyl object로 변환
    .pipe(plumber(options.plumber)) // 오류 처리
    .pipe(sass(options.scss).on("error", sass.logError)) // SASS 컴파일
    .pipe(autoPrefixer()) // CSS 접두어 적용
    .pipe(minifyCSS()) // 코드 경량화
    .pipe(concat(concats.css)) // 하나의 파일로 만들어서 배포하기 위해 '파일 병합'
    .pipe(dest(paths.css.dest, { sourcemaps: true })) // Task의 결과물이 저장될 경로 지정
    .pipe(browserSync.reload({ stream: true })); // BroswerSync로 브라우저에 반영
}

// JS
function jsHandler() {
  const b = browserify({
    entries: [paths.js.src],
    debug: true,
  });

  return b
    .bundle() // Readable Stream 생성
    .on("error", (err) => {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("bundle.js")) // Readable Stream을 vinyl object로 변환
    .pipe(buffer()) // 일부 Gulp 플러그인이 buffered vinyl object를 input로 받아 동작하므로, vinyl object를 buffered vinyl object로 변환
    .pipe(sourcemaps.init({ logMaps: true, debug: true })) // 소스맵 생성 준비
    .pipe(uglify()) // 코드 경량화
    .pipe(sourcemaps.write("./")) // 생성된 소스맵을 스트림에 추가
    .pipe(concat(concats.js)) // 하나의 파일로 만들어서 배포하기 위해 '파일 병합'
    .pipe(dest(paths.js.dest)) // Task의 결과물이 저장될 경로 지정
    .pipe(browserSync.reload({ stream: true })); // BroswerSync로 브라우저에 반영
  // .pipe(terser())
}

// Image
function imgHandler() {
  return src(paths.img.src, { since: lastRun(imgHandler) })
    .pipe(
      imagemin([
        imagemin.mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 2,
        }),
      ])
    ) //
    .pipe(dest(paths.img.dest)); //
}

function webpImg() {
  return src(paths.webp.src) //
    .pipe(webp()) //
    .pipe(dest(paths.webp.dest)); //
}

// Watch Task
function watchTask() {
  watch(paths.html.src, htmlHandler);
  watch(paths.css.src, stylesHandler);
  watch(paths.js.src, jsHandler);
  watch(paths.img.src, imgHandler);
  watch(paths.webp.src, webpImg);
}

// Build
function build(done) {
  done();
}

// Export
exports.build = build;
exports.default = series(parallel(stylesHandler, jsHandler, imgHandler, webpImg), watchTask);

function bundle() {
  return browserify({
    baseDir: "",
    debug: true,
    entries: "",
    cache: {},
    pacakgeCache: {},
  })
    .plugin(tsify)
    .bundle();
}

const tsToJs = () => {
  return bundle()
    .pipe(source("bundle.js")) //
    .pipe(buffer())
    .pipe(sourcemaps.init()) //
    .pipe();
};
