import Dock from "./dock/dock.js";

App.config({
    style: './style.css',
})

// Start the key listener
Utils.execAsync('python /home/n3rdium/.config/ags/listener.py')

// TODO make the top bar extra thin
export default {
    windows: [
        Dock()
    ],
}