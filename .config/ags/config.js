import Dock from "./dock/dock.js";

App.config({
    style: './style.css',
})

// TODO make the top bar extra thin
export default {
    windows: [
        Dock()
    ],
}