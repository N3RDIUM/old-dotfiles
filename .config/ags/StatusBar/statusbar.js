const hyprland = await Service.import('hyprland')
import delay from "../delay.js";

function limitString(str, limit=32) {
    if (str.length > limit) {
        return str.substring(0, limit - 3) + '...';
    } if (str.length < limit) {
        for(var i = str.length; i < limit; i++) {
            if(i % 2 == 0) {
                str += " "
            } else {
                str = " " + str
            }
        }
    }
    return str;
}


const WindowTitle = () => Widget.Label({
    label: '',
    css: 'font-family: Fira Code; font-size: 16px;',
    setup: self => {
        hyprland.connect('changed', async () => {
            self.label = limitString(hyprland.active.client.title);
        })
    }
})

const Time = () => Widget.Label({
    label: '06:09',
    css: 'font-weight: bold; font-family: Fira Code; font-size: 16px;',
    setup: self => {
        setInterval(() => {
            self.label = Utils.exec('date +"%H:%M"')
        }, 1000)
    }
}) 

const Layout = () => Widget.CenterBox({
    vertical: false,
    css: 'min-width: 512px; min-height: 32px;',
    center_widget: WindowTitle(),
    end_widget: Time()
})

const mouseIn = Variable(true);
const revealStatusBar = Variable(false);
const lastInteraction = Variable(Date.now());
const pose = Variable(false);
const Revealer = () => Widget.Revealer({
    revealChild: revealStatusBar.bind().as(
        x => x || pose.getValue()
    ),
    transitionDuration: 500,
    transition: 'slide_down',
    css: 'padding: 4px; padding-top: 8px; padding-bottom: 8px;',
    child: Layout(),
    setup: self => {
        setInterval(() => {
            if(mouseIn.getValue()) {
                lastInteraction.setValue(Date.now());
            }
            if (Date.now() - lastInteraction.getValue() > 512) {
                revealStatusBar.setValue(false);
            }
        }, 1024);
        Utils.monitorFile('/home/n3rdium/.config/ags/status_key', () => {
            revealStatusBar.setValue(!revealStatusBar.getValue())
            lastInteraction.setValue(Date.now());
        })
        hyprland.active.client.connect('changed', async () => {
            revealStatusBar.setValue(true);
            lastInteraction.setValue(Date.now());
        });
    }
})

const StatusBar = () => Widget.Window({
    name: `StatusBar`,
    anchor: ['top'],
    margins: [8, 8],
    css: 'padding: 1px;',
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

export default StatusBar