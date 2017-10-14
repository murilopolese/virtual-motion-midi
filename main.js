const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const virtualMidi = require('./virtual-midi');
const mainView = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Which notes to output and what is the current note being sent.
let noteOuts = [1, 2, 3, 4],
    noteIndex = 0;

mainView.on('update-steps', (e, steps) => {
    noteOuts = steps;
});

const lineariseProximity = (n) => {
    return Math.max(0, Math.min(((Math.log10(Math.max(1, n)) * 100) - 70) * 1.5, 255));
}

let createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 320, height: 480, resizable: false});

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    mainWindow.webContents.on('did-finish-load', () => {
        virtualMidi.openMidiPorts();
        virtualMidi.onMotionData((data) => {
            // Map values to the `noteOuts` items. Motion sensor
            // ranges from 0 to 255.
            if (data.detail) {
                let proximity = lineariseProximity(data.detail.proximity);
                mainWindow.webContents.send('proximity', proximity);
                if (noteOuts.length > 0) {
                    noteIndex = parseInt(
                        // Divide the proximity by the number of notes to output
                        proximity / ( 255/noteOuts.length )
                    );
                    mainWindow.webContents.send('note-index', noteIndex);
                }
            }
        });
        virtualMidi.onMidiData((deltaTime, message) => {
            if (message[0] == 144) {
                var m = [144, noteOuts[noteIndex], message[2]];
                var n = [128, noteOuts[noteIndex], message[2]];
                // Proxy the event type and velocity but not the note
                output.sendMessage(m);
                mainWindow.webContents.send('note-value', noteOuts[noteIndex]);
                setTimeout(() => {
                    output.sendMessage(n);
                }, 10);
            }
        });

    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
