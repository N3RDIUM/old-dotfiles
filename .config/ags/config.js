import TopBar from "./topbar/topbar.js";

App.config({
    style: './style.css',
})

export default {
    windows: [
        TopBar(),
    ],
};