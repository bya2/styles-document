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
const watchify = require('watchify');
const browserify = require("browserify");
const uglifyify = require("uglifyify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const bro = require("gulp-bro");
const tsify = require("tsify");
const terser = require("gulp-terser");
const gUtil = require("gulp-util");
const browserSync = require("browser-sync").create();

const _routes = {
  clean: {
    src: ["./tmp/", "./dist/"],
  },
  html: {
    watch: "public/index.html",
    src: "public/*.html",
    dest: "dist",
  },
  img: {
    src: "src/assets/**/*",
    newer: "dist",
    dest: "dist",
  },
  css: {
    watch: "src/styles/**/*.scss",
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
    watch: "src/**/*.tsx",
    src: "src/index.tsx",
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
  bro: {

  }
};

function cleaner(cb) {
  gulp
    .src(_routes.clean.src, {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
  cb();
}
exports.clean = gulp.series(cleaner);

function htmlBuilder(cb) {
  gulp
    .src(_routes.html.src)
    .pipe(htmlmin(_options.htmlmin)) // minify
    .pipe(gulp.dest(_routes.html.dest));
  cb();
}

exports.onlyHTML = gulp.series(cleaner, htmlBuilder);

function imgBuilder(cb) {
  gulp
    .src(_routes.img.src)
    .pipe(newer(_routes.img.newer))
    .pipe(imagemin(_plugins.imagemin), _options.imagemin)
    .pipe(gulp.dest(_routes.img.dest));
  cb();
}

exports.onlyImg = gulp.series(cleaner, imgBuilder);

function cssBuilder(cb) {
  gulp
    .src(_routes.css.src, { since: gulp.lastRun(cssBuilder) }) // LATEST CHANGE
    .pipe(aliases(_options.aliases)) // ALIAS
    .pipe(sassGlob()) // GLOB IMPORT
    .pipe(sourcemaps.init())
    .pipe(sass(_options.sass).on("error", sass.logError)) // COMPILE
    .pipe(autoPrefixer(_options.autoPrefixer))
    .pipe(cleanCSS(_options.cleanCSS)) // MIN
    .pipe(sourcemaps.write(_routes.css.maps))
    .pipe(gulp.dest(_routes.css.dest));
  cb();
}

exports.onlyCSS = gulp.series(cleaner, cssBuilder);

function transpileTS(cb) {
  const tsProject = ts.createProject(_routes.ts.config);
  tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js //
    .pipe(sourcemaps.write(_routes.ts.maps))
    .pipe(gulp.dest(_routes.ts.dest));
  cb();
}

exports.onlyTS = gulp.series(cleaner, transpileTS);

function minJS(cb) {
  gulp.src(_routes.js.src).pipe(browserify()).pipe(uglify()).pipe(concat(_names.js.concat)).pipe(gulp.dest(_routes.js.dest));
  cb();
}

exports.onlyJS = gulp.series(minJS);

function jsBuilder(cb) {
  // Task의 시작을 Vinly 객체가 아닌 Node.js의 Stream을 생성해서 시작.
  // 이대로 스트림을 dest에 전달하면 Readable stream만 전달되어 오류가 발생함. 이를 vinly 객체로 변환해줄 플러그인(장치) 필요.

  // Vinyl: GULP의 기반이 되는 가상 포맷. 파일을 경로와 컨텐츠 등의 메타데이터로 추상화. 이를 통해 파일을 어디서든 다룰 수 있도록 해줌.
  // Vinly Object: 경로와 컨텐츠 등의 메타데이터로 이루어진 일종의 가상 파일 포맷.
  // src: 파일 시스템에서 파일을 읽어서 vinly 객체로 변환해주는 과정
  // dest: vinly 객체를 실제 파일로 변환해주는 과정
  // vinly-source-stream: 파라미터로 파일명을 주입하는 이유: browserify가 반환한 Readable Stream으로 컨텐츠만 충족. 경로를 주입해줘야함.

  // 일부 gulp 플러그인들을 vinly object를 입력받는 것이 아니라 buffered vinly object를 입력받아서 동작 (이 때 vinly-buffer로 변환해줌)
  // 대표적으로 gulp-uglify

  const bundleStream = browserify(path.resolve(__dirname, _routes.js.src)) // Node.js의 Readable Stream.
    .plugin(tsify)
    .transform(babelify, {
      presets: ["@babel/preset-react"],
      extensions: [".json", ".ts", ".tsx", ".js", ".jsx"],
    })
    .transform(uglifyify, { global: true })
    .bundle()
    .on("error", gUtil.log);

  bundleStream
    .pipe(source("main.js")) // Readable Stream을 Vinly Object로 변환.
    .pipe(buffer()) // sourcemaps
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("maps"))
    .pipe(gulp.dest(_routes.js.dest));
}

exports.onlyJS = gulp.series(cleaner, jsBuilder);

function server(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

function reloader(cb) {
  browserSync.reload();
  cb();
}

function watcher(cb) {
  gulp.watch(_routes.html.watch, gulp.series(htmlBuilder));
  gulp.watch(_routes.img.watch, gulp.series(imgBuilder));
  gulp.watch(_routes.css.watch, gulp.series(cssBuilder));
  gulp.watch(_routes.js.watch, gulp.series(jsBuilder, reloader));
  cb();
}

function builder(cb) {
  gulp.series(cleaner, gulp.parallel(htmlBuilder, imgBuilder, cssBuilder, jsBuilder), server, watcher);
}

exports.build = builder;
