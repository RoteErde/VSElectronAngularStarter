const { app, BrowserWindow } = require("electron");
const http = require('http');
const path = require("path");
const url = require("url");
const isDev=process.env.isDev;
let win;

console.log("isDev: "+isDev);


function createWindow() {
  win = new BrowserWindow({ 
      width: 800, 
      height: 600,
      webPreferences:{
          nodeIntegration:true
      }
         });

  if (isDev){
    win.loadURL('http://localhost:9080');
  }else{
    win.loadURL (`file://${path.join(__dirname, '/dist/index.html')}`);
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});