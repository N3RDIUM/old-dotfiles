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

// TODO: Add multiple player support
const revealMedia = Variable(false);
const lastInteraction = Variable(Date.now());
const mouseIn = Variable(false);
const pose = Variable(false);
const Revealer = () => Widget.Revealer({
    revealChild: revealMedia.bind().as(
        x => x || pose.getValue()
    ),
    transitionDuration: 500,
    transition: 'slide_left',
    child: new Player({ coverart: '', title: '', progress: 0, playeridx: 0 }),
    setup: self => {
        setInterval(() => {
            if(mouseIn.getValue()) {
                lastInteraction.setValue(Date.now());
            }
            if (Date.now() - lastInteraction.getValue() > 1024) {
                revealMedia.setValue(false);
            }
        }, 1024);

        audio.connect('changed', async () => {
            revealMedia.setValue(true);
            lastInteraction.setValue(Date.now());
        })

        mpris.connect('player-changed', async ({ players }) => {
            revealMedia.setValue(true);
            lastInteraction.setValue(Date.now());
            
            for (var player of players) {
                self.get_child().coverart = Utils.exec('/bin/python /home/n3rdium/.config/ags/force_square.py ' + player.track_cover_url);
                self.get_child().title = limitString(player.track_title);
            }
            if(players.length == 0) {
                self.get_child().coverart = '/home/n3rdium/.config/ags/Media/icons/default.svg'
                self.get_child().title = 'Nothing'
            }
        });

        hyprland.active.connect('changed', async () => {
            revealMedia.setValue(false);
        });

        setInterval(() => {
            if(mpris.players.length == 0) {
                self.get_child().coverart = '/home/n3rdium/.config/ags/Media/icons/default.svg'
                self.get_child().title = 'Nothing'
            }
        }, 100)
    }
})

const Media = () => Widget.Window({
    name: `Media`,
    anchor: ['bottom', 'right'],
    margins: [16, 16],
    css: 'padding: 1px',
    child: Widget.Box({
        css: 'padding: 1px;',
        child: Widget.EventBox({
            child: Revealer(),
            onHover: () => {
                mouseIn.setValue(true)
            },
            onHoverLost: () => {
                mouseIn.setValue(false)
            }
        }),
    }),
})

hyprland.active.connect('changed', () => {
    mouseIn.setValue(false);
})

Utils.monitorFile('/home/n3rdium/.config/ags/pose', () => {
    var contents = Utils.readFile('/home/n3rdium/.config/ags/pose')
    if(Number(contents) == 0) {
        pose.setValue(false)
    } else {
        pose.setValue(true)
    }
})

App.config({
    style: './style.css',
})

export default Media