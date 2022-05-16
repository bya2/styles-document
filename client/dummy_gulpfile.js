const fs = require("fs");
const gulp = require("gulp"); // { task, src, dest, lastRun, series, parallel, watch }
const browserSync = require("browser-sync").create();

const clean = require("gulp-clean");

const htmlmin = require("gulp-htmlmin");

// const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer"); // source stream 상의 파일들이 dist 폴더의 결과물보다 더 최신의 timestamp를 가진 경우에만 스트림으로 흘려보냄. cached와 달리 파일 변경을 감지하지 않을 때 사용.

const cached = require("gulp-cached");
const remember = require("gulp-remember");

const sourcemaps = require("gulp-sourcemaps"); // 코드상의 위치를 알려주는 것. sourcemaps 를 설정하게 되면 SCSS 파일의 위치를 알려주기 때문에 유용하게 사용
const sass = require("gulp-sass")(require("sass"));
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

const ts = require("gulp-typescript");

const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

const alias = require("@gulp-plugin/alias");
const bro = require("gulp-bro"); // 번들링 (gulp + browserify)
const browserify = require("browserify"); // 번들링
const babelify = require("babelify"); // 트랜스파일
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const tsify = require("tsify");

const _tasks = {
  clean: "clean",
  copyHTML: "html:copy",
  minImg: "image:minify",
  compileSCSS: "scss:compile",
  cssMin: "css:minify",
  transpileTS: "ts:compile",
  bundleJS: "js:bundle",
  buildJS: "js:build",
  serveBro: "browser:serve",
  watch: "watch",
  default: "default",
};

const _paths = {
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

// const _plugins = {
//   imagemin: [
//     imagemin.svgo({
//       plugins: [
//         {
//           removeViewBox: true,
//         },
//         {
//           cleanupIDs: false,
//         },
//       ],
//     }),
//   ],
// };

const _options = {
  htmlmin: {
    caseSensitive: true, // 대소문자 구분
    decodeEntities: true, // 유니코드 문자 직접 사용
    collapseBooleanAttributes: true, // 태그의 Boolean 속성이 기본값일 경우 값을 생략

    collapseWhitespace: true, // 공백 제거
    collapseInlineTagWhitespace: true, // collapseWhitespace와 함께 사용. 인라인 태그 사이에 공백을 두지 않음.
    conservativeCollapse: true, // collapseWhitespace와 함께 사용. 축소할 때 공백 1칸을 둠.

    continueOnParseError: true, // 에러 제어

    removeAttributeQuotes: true, // 속성 값에 대한 인용부호를 가능하다면 제거
    removeComments: true, // 주석 제거
    removeEmptyAttributes: true, // 값이 비어있는 속성 제거
    removeEmptyElements: false, // 태그 내부가 비어있는 태그 제거 (현재: false)
    removeOptionalTags: false, // HEAD, BODY 태그 제거 (현재: false)
    removeRedundantAttributes: false, // 속성 값이 기본 값일 때, 속성 제거 (현재: false: collapseBooleanAttributes와 충돌)

    sortAttributes: false, // 속성 정렬 (빈번하게) x
    sortClassName: false, // 클래스 이름 정렬 (빈번하게) x
  },
  imagemin: {
    verbose: true,
  },
  src: {
    scss: {
      since: gulp.lastRun(["scss:compile"]),
    },
  },
  sass: {
    outputStyle: "expanded", // nested, compressed
    indentType: "tab", // space, tab
    indentWidth: 2, // outputStyle이 nested, expanded일 경우에만 사용.
    precision: 6, // 컴파일된 CSS의 소숫점 자릿수.
    sourceComments: true, // 컴파일된 CSS에 원본 소스의 위치와 주석 표시.
  },
  autoPrefixer: {},
  cleanCSS: {
    debug: true,
  },
  bro: {
    transform: [babelify.configure({ presets: ["es2015"] }), ["uglifyify", { global: true }]],
  },
};

gulp.task(_tasks.clean, function () {
  return gulp
    .src(["./tmp/", "./dists/"], {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
});

gulp.task(_tasks.copyHTML, function () {
  return gulp.src(_paths.html.src).pipe(htmlmin(_options.htmlmin)).pipe(gulp.dest(_paths.html.dest));
});

// gulp.task(_tasks.minImg, function () {
//   return gulp
//     .src(_paths.image.src)
//     .pipe(newer(_paths.image.newer))
//     .pipe(imagemin(_plugins.imagemin, _options.imagemin))
//     .pipe(gulp.dest(_paths.image.dest));
// });

gulp.task(_tasks.compileSCSS, function () {
  return gulp
    .src(_paths.scss.src, _options.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass(_options.sass).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoPrefixer(_options.autoPrefixer))
    .pipe(cleanCSS(_options.cleanCSS))
    .pipe(gulp.dest(_paths.scss.dest))
    .pipe(browserSync.stream());
});

gulp.task(_tasks.transpileTS, function () {
  const tsProject = ts.createProject("./tsconfig.json");
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write("./sourcemaps"))
    .pipe(gulp.dest(_paths.ts.dest));
});

gulp.task(_tasks.minJS, function () {
  return gulp
    .src("./tmp/index.tsx")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(browserify()) // 번들링
    .pipe(uglify()) // 파일을 최소화
    .pipe(concat("App.min.js")) // 파일을 하나로 연결
    .pipe(sourcemaps.write("./sourcemaps"))
    .pipe(gulp.dest(_paths.js.dest));
});

gulp.task(_tasks.buildJS, function () {
  const b = browserify({
    basedir: "./src/",
    debug: true,
    entries: ["src/index.tsx"],
  });

  return b.plugin(tsify).transform("babelify", {
    presets: ["@babel/preset-react"],
    extensions: [".json", ".ts", ".tsx", ".js", ".jsx"],
  });
});

gulp.task(_tasks.serveBro, function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

gulp.task(_tasks.watch, function () {
  gulp.watch(_paths.html, ["html:minify"]).on("change", browserSync.reload);
  gulp.watch(_paths.scss, ["scss:compile"]);
});

gulp.task(_tasks.default, [
  _tasks.clean,
  _tasks.minImg,
  gulp.parallel([_tasks.copyHTML, _tasks.compileSCSS, gulp.series([_tasks.transpileTS, _tasks.minJS])]),
  _tasks.serveBro,
  _tasks.watch,
]);
