const process = require("process");
const path = require("path");

module.exports = {
  aliases: {
    "@api": path.resolve(process.cwd(), "src/api") || "src/api",
    "@assets": path.resolve(process.cwd(), "src/assets") || "src/assets",
    "@components": path.resolve(process.cwd(), "src/components") || "src/components",
    "@config": path.resolve(process.cwd(), "src/config") || "src/config",
    "@models": path.resolve(process.cwd(), "src/models") || "src/models",
    "@store": path.resolve(process.cwd(), "src/store") || "src/store",
    "@styles": path.resolve(process.cwd(), "src/styles") || "src/styles",
    "@styles-layouts": path.resolve(process.cwd(), "src/styles/layouts") || "src/styles/layouts",
    "@styles-components": path.resolve(process.cwd(), "src/styles/components") || "src/styles/components",
    "@": path.resolve(process.cwd(), "src") || "src",
  },
  appliesTo: { includeExtensions: [".json", ".ts", ".tsx", ".js", ".jsx"] },
  verbose: false,
};
