import config from '../config_loader.js';
const wallpapers = config['wallpaper-changer']['wallpapers'];
const type = config['wallpaper-changer']['transition-type'];
const duration = config['wallpaper-changer']['transition-duration'];

export function changeWallpaper(workspace) {
    const wallpaper = wallpapers[workspace - 1]
    if (!wallpaper) {
        return
    }
    let command = 'swww img ' + wallpaper 
        + ' --transition-type ' + type
        + ' --transition-duration ' + duration
    Utils.execAsync(command)
}
