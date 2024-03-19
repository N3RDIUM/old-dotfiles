const hyprland = await Service.import('hyprland');

import { changeWallpaper } from "./Wallpaper/wallpaper_changer.js";
import Dock from "./Dock/dock.js";
import Media from "./Media/media.js";
// import Monitor from './SysMonitor/system_monitor.js'
import Workspaces from "./Workspaces/workspaces.js";
import delay from "./delay.js";

hyprland.active.workspace.connect('changed', async () => {
    await delay(64)
    changeWallpaper(hyprland.active.workspace.id)
})

Utils.execAsync('/bin/python /home/n3rdium/.config/ags/superkey.py')

export default {
    windows: [
        Dock(),
        Media(),
        // Monitor(), // To improve
        // Workspaces()
    ],
}