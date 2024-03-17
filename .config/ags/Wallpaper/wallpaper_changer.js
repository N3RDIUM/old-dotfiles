const wallpapers = [
    "/home/n3rdium/.config/ags/Wallpaper/code.gif",
    "/home/n3rdium/.config/ags/Wallpaper/eastentrance.gif",
    "/home/n3rdium/.config/ags/Wallpaper/underbridge.gif",
    "/home/n3rdium/.config/ags/Wallpaper/autumn.gif",
    "/home/n3rdium/.config/ags/Wallpaper/futurecity.gif",
    "/home/n3rdium/.config/ags/Wallpaper/expectopatronum.gif",
    "/home/n3rdium/.config/ags/Wallpaper/spaceship.gif",
    "/home/n3rdium/.config/ags/Wallpaper/sthstation.gif",
    "/home/n3rdium/.config/ags/Wallpaper/signal.gif",
    "/home/n3rdium/.config/ags/Wallpaper/transcend.gif",
]

export function changeWallpaper(workspace) {
    const wallpaper = wallpapers[workspace - 1]
    if (!wallpaper) {
        return
    }
    Utils.execAsync('zsh -c \"swww img ' + wallpaper + ' --transition-type center \"')
}
