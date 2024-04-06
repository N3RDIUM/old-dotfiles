import Bar from "./bar/bar.js";
import RightPane from "./rightpane/rightpane.js";
import LeftPane from "./leftpane/leftpane.js";
import BottomPane from "./bottompane/bottompane.js";

App.config({
    style: './style.css',
})

export default {
    windows: [
        Bar(),
        // RightPane(), // TODO: Revealers for these panes
        // LeftPane(),
        // BottomPane(),
    ],
}