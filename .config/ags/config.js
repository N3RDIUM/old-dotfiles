import Bar from "./bar/bar.js";
import Media from "./media/media.js";

App.config({
    style: './style.css',
})

export default {
    windows: [
        Bar(),
        // Media()
    ],
}