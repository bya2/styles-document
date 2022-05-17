const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const sourcemaps = require("gulp-sourcemaps");
const aliases = require("gulp-style-aliases"); // 별칭 적용
const header = require("gulp-header"); // 상단 스크립트 선언
const sassShopify = require("gulp-shopify-sass"); // IMPORT를 4가지 형태의 파일 이름으로 로드
const sassGlob = require("gulp-sass-glob"); // 전역 IMPORT 선언
const sassImportOnce = require("gulp-sass-import-once"); // 중복 IMPORT 제거
const sass = require("gulp-sass")(require("sass"));
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const ts = require("gulp-typescript");
const browserify = require("browserify");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

const _paths = {
  clean: {
    src: ["./tmp/", "./dist/"],
  },
  html: {
    src: "public/*.html",
    dest: "dist",
  },
  image: {
    src: "src/assets/**/*",
    newer: "dist",
    dest: "dist",
  },
  css: {
    src: "src/styles/main.scss",
    maps: "maps",
    dest: "tmp",
  },
  ts: {
    config: "./tsconfig.json",
    maps: "maps",
    dest: "tmp",
  },
  js: {
    src: "src/index.js",
    dest: "dist",
  },
};

const _names = {
  js: {
    concat: "concat.min.js",
  },
};

const _plugins = {
  imagemin: [
    imagemin.svgo({
      plugins: [
        {
          removeViewBox: true,
        },
        {
          cleanupIDs: false,
        },
      ],
    }),
  ],
};

const _options = {
  htmlmin: {
    caseSensitive: true, // 대소문자 구분
    decodeEntities: true, // 유니코드 문자 직접 사용
    collapseBooleanAttributes: true, // 태그의 Boolean 속성이 기본값일 경우 값을 생략

    collapseWhitespace: true, // 공백 제거
    collapseInlineTagWhitespace: true, // collapseWhitespace와 함께 사용. 인라인 태그 사이에 공백을 두지 않음.
    conservativeCollapse: false, // collapseWhitespace와 함께 사용. 축소할 때 공백 1칸을 둠. (x)

    continueOnParseError: true, // 에러 제어

    removeAttributeQuotes: true, // 속성 값에 대한 인용부호를 가능하다면 제거
    removeComments: true, // 주석 제거
    removeEmptyAttributes: true, // 값이 비어있는 속성 제거
    removeEmptyElements: false, // 태그 내부가 비어있는 태그 제거 (x)
    removeOptionalTags: false, // HEAD, BODY 태그 제거 (x)
    removeRedundantAttributes: false, // 속성 값이 기본 값일 때, 속성 제거 (현재: false: collapseBooleanAttributes와 충돌)

    sortAttributes: false, // 속성 정렬 (빈번하게) x
    sortClassName: false, // 클래스 이름 정렬 (빈번하게) x
  },
  imagemin: {
    verbose: true,
  },
  aliases: {
    "@styles-layouts": path.resolve(__dirname, "src/styles/layouts"),
    "@styles-components": path.resolve(__dirname, "src/styles/components"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@": path.resolve(__dirname, "src"),
  },
  sass: {
    outputStyle: "expanded", // nested, compressed
    indentType: "tab", // space, tab
    indentWidth: 2, // outputStyle이 nested, expanded일 경우에만 사용.
    precision: 6, // 컴파일된 CSS의 소숫점 자릿수.
    sourceComments: true, // 컴파일된 CSS에 원본 소스의 위치와 주석 표시.
  },
  // autoPrefixer: {},
  // cleanCSS: {
  //   debug: true,
  // },
  // bro: {
  //   transform: [babelify.configure({ presets: ["es2015"] }), ["uglifyify", { global: true }]],
  // },
};

function cleanDir(cb) {
  gulp
    .src(_paths.clean.src, {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
  cb();
}
exports.clean = gulp.series(cleanDir);

function copyHTML(cb) {
  gulp
    .src(_paths.html.src)
    .pipe(htmlmin(_options.htmlmin)) // minify
    .pipe(gulp.dest(_paths.html.dest));
  cb();
}

exports.onlyHTML = gulp.series(cleanDir, copyHTML);

function minImg(cb) {
  gulp
    .src(_paths.image.src)
    .pipe(newer(_paths.image.newer))
    .pipe(imagemin(_plugins.imagemin), _options.imagemin)
    .pipe(gulp.dest(_paths.image.dest));
  cb();
}

exports.onlyImg = gulp.series(cleanDir, minImg);

function compileSCSS(cb) {
  gulp
    .src(_paths.css.src, { since: gulp.lastRun(compileSCSS) }) // LATEST CHANGE
    .pipe(aliases(_options.aliases)) // ALIAS
    .pipe(sassGlob()) // GLOB IMPORT
    .pipe(sourcemaps.init())
    .pipe(sass(_options.sass).on("error", sass.logError)) // COMPILE
    .pipe(autoPrefixer(_options.autoPrefixer))
    .pipe(cleanCSS(_options.cleanCSS)) // MIN
    .pipe(sourcemaps.write(_paths.css.maps))
    .pipe(gulp.dest(_paths.css.dest));
  cb();
}

exports.onlyCSS = gulp.series(cleanDir, compileSCSS);

function transpileTS(cb) {
  const tsProject = ts.createProject(_paths.ts.config);
  tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js //
    .pipe(sourcemaps.write(_paths.ts.maps))
    .pipe(gulp.dest(_paths.ts.dest));
  cb();
}

exports.onlyTS = gulp.series(cleanDir, transpileTS);

function minJS(cb) {
  gulp.src(_paths.js.src).pipe(browserify()).pipe(uglify()).pipe(concat(_names.js.concat)).pipe(gulp.dest(_paths.js.dest));
  cb();
}

exports.onlyJS = gulp.series(minJS);

function watch(cb) {
  cb();
}
