const {app, BrowserWindow} = require ("electron");
const path = require ("path");
const url = require ("url");

function crearVentana () {
    const ventana = new BrowserWindow({
        width: 572,
        height: 858})
    ventana.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
        /*webPreferences: {
            /!*preload: path.join(__dirname, "preload.js")
        }*!/*/
    }))
    /*ventana.loadFile("../index.html");*/
}
app.whenReady().then(() => {
    crearVentana();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) crearVentana()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
