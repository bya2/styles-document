module.exports = {
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
    vinlySrc: "bundle.js",

    maps: "maps",
    dest: "dist",
  },
};
