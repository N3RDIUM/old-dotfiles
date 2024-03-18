// @ts-nocheck
const hyprland = await Service.import('hyprland');
const audio = await Service.import('audio')
const mpris = await Service.import('mpris');
import Player from './player.js'

function limitString(str, limit=32) {
    if (str.length > limit) {
        return str.substring(0, limit - 3) + '...';
    }
    return str;
}

const revealMedia = Variable(false);
const lastInteraction = Variable(Date.now());
const Revealer = () => Widget.Revealer({
    revealChild: revealMedia.bind(),
    transitionDuration: 500,
    transition: 'slide_left',
    child: new Player({ coverart: '', title: '', progress: 0 }),
    setup: self => {
        setInterval(() => {
            if (Date.now() - lastInteraction.getValue() > 1024) {
                revealMedia.setValue(false);
            }
        }, 1024);

        audio.connect('changed', async () => {
            revealMedia.setValue(true);
            lastInteraction.setValue(Date.now());
        })

        mpris.connect('player-changed', ({ players }) => {
            revealMedia.setValue(true);
            lastInteraction.setValue(Date.now());
            
            for (var player of players) {
                self.get_child().coverart = Utils.exec('/bin/python /home/n3rdium/.dotfiles/.config/ags/force_square.py ' + player.cover_path);
                self.get_child().title = limitString(player.track_title);
                if(player.length && player.position) {
                    self.get_child().progress = player.position / player.length;
                } else {
                    self.get_child().progress = 0;
                }
            }
        });

        hyprland.active.connect('changed', async () => {
            revealMedia.setValue(false);
        });
    }
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