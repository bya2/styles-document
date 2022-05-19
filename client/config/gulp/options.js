const path = require("path");

module.exports = {
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
  autoPrefixer: {},
  cleanCSS: {
    debug: true,
  },
  // bro: {
  //   transform: [babelify.configure({ presets: ["es2015"] }), ["uglifyify", { global: true }]],
  // },
  browserify: {
    basedir: ".",
    debug: true,
    entries: ["src/index.tsx"],
    cache: {},
    packageCache: {},
  },
  watchify: {
    delay: 100,
    ignoreWatch: ["**/node_modules/**"],
    poll: false,
  },
  babelify: {
    // presets: ["@babel/preset-react"],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    // cacheDirectory: true,
    // cacheCompression: false,
    extensions: [".json", ".ts", ".tsx", ".js", ".jsx"],
  },
  browserifyCss: {
    poll: true,
  },
  scssify: {
    sass: {
      outputStyle: "compressed",
      importer: "./config/sass-importers.js",
      includePaths: ["node_modules", "bower_components"],
      sourceMapEmbed: true,
      sourceMapContents: true,
      autoInject: {
        prepend: `@import "@/styles/global.scss";`,
      },
    },

    // postcss: {
    //   autoprefixer: {
    //     browsers: ['last 2 versions']
    //   }
    // }
  },
  uglifyify: {
    global: true,
  },
};
