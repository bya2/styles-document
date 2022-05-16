const process = require("process");
const path = require("path");
const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const { IPC_PING__NEW_NODE, IPC_PING__OPEN_DOC } = require("../src/config/ipc");

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

ipcMain.on(IPC_PING__NEW_NODE, (event, arg) => {
  console.log("new node");
});

ipcMain.on(IPC_PING__OPEN_DOC, (event, arg) => {
  console.log("open doc");
});

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        click: () => {
          shell.openExternal("http://github.com/bya2");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
