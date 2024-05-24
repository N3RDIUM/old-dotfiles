import TopBar from "./topbar.js";
import BottomBar from "./bottombar.js";

App.config({
    style: './style.css',
})

export default {
    windows: [
        TopBar(),
        BottomBar()
    ],
};