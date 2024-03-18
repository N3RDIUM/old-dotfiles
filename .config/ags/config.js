const hyprland = await Service.import('hyprland');

import { changeWallpaper } from "./Wallpaper/wallpaper_changer.js";
import Dock from "./Dock/dock.js";
import Media from "./Media/media.js";

hyprland.active.connect('changed', () => {
    changeWallpaper(hyprland.active.workspace.id)
})

Utils.execAsync('/bin/python /home/n3rdium/.config/ags/superkey.py')

export default {
    windows: [
        Dock(),
        Media()
    ],
}