const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const path = require("path");

const notifyBtn = document.getElementById("notifyBtn");

notifyBtn.addEventListener("click", e => {
  const modalPath = path.join(__dirname, "add.html");

  // frame: false deletes the chrome for menu section on the window
  let win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });

  win.on("close", () => {
    win = null;
  });

  win.loadFile(modalPath);
  win.show();
});
