import Bar from "./bar/bar.js";
import Media from "./media/media.js";

App.config({
    style: './style.css',
})

// TODO make the top bar extra thin
export default {
    windows: [
        Bar(),
        // Media()
    ],
}