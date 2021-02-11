const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow () {
    const win = new BrowserWindow({
      width: 500,
      height: 900,
      webPreferences: {
        nodeIntegration: false,
        worldSafeExecuteJavaScript: true, 
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
    //win.webContents.openDevTools()
}

if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

ipcMain.on('notify', (_,message) => {
    new Notification({title: 'Notification', body: message}).show();
})

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

