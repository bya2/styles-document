const process = require("process");
const path = require("path");
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  let mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "src/preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWin.loadURL("http://localhost:3003");
  mainWin.on("closed", () => {
    mainWin = null;
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
