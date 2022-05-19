const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const gulpClean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const sourcemaps = require("gulp-sourcemaps");
const aliases = require("gulp-style-aliases");
const header = require("gulp-header");
const gss = require("gulp-shopify-sass"); // IMPORT를 4가지 형태의 파일 이름으로 로드
const sassGlob = require("gulp-sass-glob"); // 전역 IMPORT 선언
const sassImportOnce = require("gulp-sass-import-once"); // 중복 IMPORT 제거
const sass = require("gulp-sass")(require("sass"));
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

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
  scss: {
    src: "src/styles/**/*.scss",
    maps: "maps",
    dest: "tmp",
  },
  css: {
    src: "tmp/*.css",
    dest: "dist",
  },
  ts: {
    dest: "tmp",
  },
  js: {
    src: "src/index.tsx",
    dest: "dist",
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

function clean(cb) {
  gulp
    .src(_paths.clean.src, {
      read: false,
      allowEmpty: true,
    })
    .pipe(gulpClean());
  cb();
}
exports.clean = gulp.series(clean);

function copyHTML(cb) {
  gulp
    .src(_paths.html.src)
    .pipe(htmlmin(_options.htmlmin)) // minify
    .pipe(gulp.dest(_paths.html.dest));
  cb();
}

exports.copyHTML = gulp.series(clean, copyHTML);

function minImg(cb) {
  gulp
    .src(_paths.image.src)
    .pipe(newer(_paths.image.newer))
    .pipe(imagemin(_plugins.imagemin), _options.imagemin)
    .pipe(gulp.dest(_paths.image.dest));
  cb();
}

exports.minImg = gulp.series(clean, minImg);

function compileSCSS(cb) {
  gulp
    .src(_paths.scss.src, { since: gulp.lastRun(compileSCSS) })
    .pipe(
      aliases({
        "@": "src" || path.resolve(__dirname, "src"),
        "@styles": "src/styles" || path.resolve(__dirname, "src/styles"),
        "@styles-layouts": path.resolve(__dirname, "src/styles/layouts"),
        "@styles-components": path.resolve(__dirname, "src/styles/components"),
      })
    )
    // .pipe(header(`@import "${path.resolve(__dirname, "src/styles")}/__index";`))
    .pipe(gss())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        ..._options.sass,
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write(_paths.scss.maps))
    .pipe(gulp.dest(_paths.scss.dest));
  cb();
}

exports.compileSCSS = gulp.series(clean, compileSCSS);

function minCSS(cb) {
  gulp
    .src(_paths.css.src)
    .pipe(autoPrefixer(_options.autoPrefixer))
    .pipe(cleanCSS(_options.cleanCSS))
    .pipe(gulp.dest(_paths.css.dest));
  cb();
}

exports.minCSS = gulp.series(clean, compileSCSS, minCSS);

function transpileTS(cb) {
  cb();
}

function minJS(cb) {
  cb();
}

function watch(cb) {
  gulp.watch(_r)
  cb();
}
