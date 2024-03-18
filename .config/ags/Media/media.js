const hyprland = await Service.import('hyprland');
const audio = await Service.import('audio')
const mpris = await Service.import('mpris');
import Player from './player.js'

const players = Variable([
    new Player({
        coverart: '/home/n3rdium/.config/ags/Media/icons/player.svg',
        title: 'Player',
        playlist: 'Playlist',
        artist: 'Artist',
    })
]);
const MediaLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding: 8px',
    children: players.bind(),
})

const revealMedia = Variable(false);
const lastInteraction = Variable(Date.now());
const Revealer = () => Widget.Revealer({
    revealChild: revealMedia.bind(),
    transitionDuration: 500,
    transition: 'slide_left',
    child: MediaLayout(),
    setup: self => {
        audio.connect('changed', async () => {
            self.revealChild = true;
            lastInteraction.setValue(Date.now());
        })
        setInterval(() => {
            if (Date.now() - lastInteraction.getValue() > 1024) {
                self.revealChild = false;
            }
        }, 1024);
    }
})
hyprland.active.connect('changed', async () => {
    revealMedia.setValue(false);
})

const Media = () => Widget.Window({
    name: `Media`,
    anchor: ['bottom', 'right'],
    margins: [16, 16],
    css: 'padding: 1px',
    child: Widget.Box({
        css: 'padding: 1px;',
        child: Revealer(),
    }),
})

App.config({
    style: './Media/style.css',
})

export default Media