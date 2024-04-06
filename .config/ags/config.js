import Bar from "./bar/bar.js";
import RightPane from "./rightpane/rightpane.js";

App.config({
    style: './style.css',
})

export default {
    windows: [
        Bar(),
        // RightPane() // TODO: Revealer for the right pane
    ],
}