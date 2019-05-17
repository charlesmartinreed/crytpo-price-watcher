const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const shell = require("electron").shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "src/index.html"));

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// MENU CREATION
const mainMenuTemplate = [
  // { role: 'appMenu' }
  ...(process.platform === "darwin"
    ? [
        {
          label: app.getName(),
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }
          ]
        }
      ]
    : []),
  {
    label: "Menu",
    submenu: [
      { label: "Adjust Notification Value" },
      {
        label: "CoinaMarketCap",
        click() {
          // shell is used to open up a web browser
          shell.openExternal("https://coinmarketcap.com");
        }
      },
      { type: "separator" },
      {
        label: "Exit",
        click() {
          if (process.platform !== "darwin") {
            app.quit();
          }
          // now, this is a conscious decision choice for making the app feel more 'Apple-y', just close the window instead of closing the app
          win.close();
        }
      }
    ]
  }
  // and adding additional menu options is trivial
  // {
  //   label: "Info",
  //   submenu: [
  //     { label: "Dummy Item 1" },
  //     { label: "Dummy Item 2" },
  //     { label: "Dummy Item 3" },
  //     { type: "separator" },
  //     { label: "Dummy Item 4" },
  //     { label: "Dummy Item 5" },
  //     { label: "Dummy Item 6" }
  //   ]
  // }
];

var menu = Menu.buildFromTemplate(mainMenuTemplate);

Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
