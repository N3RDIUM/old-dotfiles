const hyprland = await Service.import('hyprland')

import AppIcon from './icon.js'
import windiff from './app_getter.js'
import delay from '../delay.js'

const taskbarIcons = Variable({})
const iconsDeleteLock = Variable(false)

windiff.connect('opened', (service, ...args) => {
    if(args[0].pid == -1) { return }
    if(args[0].details.icon) {
        let icons = taskbarIcons.getValue()
        icons[args[0].pid] = Widget.Button({
            child: new AppIcon({
                icon: args[0].details.icon
            }),
            on_clicked: async self => {
                let icon = self.get_child().get_children()[0].get_child()
                lastInteraction.setValue(Date.now());
                icon.css = 'font-size: 48px; padding: 8px; min-width: 48px; min-height: 48px; animation: shrink-once48 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 48px; padding: 8px; min-width: 48px; min-height: 48px;';
            }
        })
        taskbarIcons.setValue(icons)
    }
    lastInteraction.setValue(Date.now());
    revealDock.setValue(true);
})
windiff.connect('closed', async (service, ...args) => {
    if(args[0].pid == -1) { return }
    let icons = taskbarIcons.getValue()
    icons[args[0].pid].get_child().get_children()[0].revealChild = false
    await delay(1024)
    while(iconsDeleteLock) {await delay(128)}
    iconsDeleteLock.setValue(true)
    delete icons[args[0].pid]
    taskbarIcons.setValue(icons)
    lastInteraction.setValue(Date.now());
    revealDock.setValue(true);
    iconsDeleteLock.setValue(false)
})

const Taskbar = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding: 8px; padding-left: 16px;',
    children: taskbarIcons.bind().as(x => Object.values(x))
})

const DockLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding: 8px',
    children: [
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Dock/icons/grid.svg',
                css: 'font-size: 48px; padding: 12px; padding-right: 18px; min-width: 48px; min-height: 48px;'
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                lastInteraction.setValue(Date.now());
                icon.css = 'font-size: 48px; padding: 12px; padding-right: 18px; min-width: 48px; min-height: 48px; animation: shrink-once48 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 48px; padding: 12px; padding-right: 18px; min-width: 48px; min-height: 48px;';
            }
        }),
        Widget.Revealer({
            child: Widget.Separator({
                css: 'background: #ededed; min-width: 4px; border-radius: 2px;'
            }),
            transitionDuration: 500,
            transition: 'slide_right',
            revealChild: true,
            setup: self => {
                hyprland.connect('changed', () => {
                    var clients = hyprland.clients.filter(x => x.workspace.id == hyprland.active.workspace.id)
                    if(clients.length == 0) {
                        self.reveal_child = false
                    } else {
                        self.reveal_child = true
                    }
                })
            }
        }),
        Taskbar(),
        Widget.Revealer({
            child: Widget.Button({
                child: Widget.Icon({
                    icon: '/home/n3rdium/.config/ags/Dock/icons/launcher.svg',
                    css: 'font-size: 48px; padding: 12px; padding-right: 16px; min-width: 48px; min-height: 48px;'
                }),
                on_clicked: async self => {
                    let icon = self.get_child()
                    lastInteraction.setValue(Date.now());
                    icon.css = 'font-size: 48px; padding: 12px; padding-right: 16px; min-width: 48px; min-height: 48px; animation: shrink-once48 0.256s ease-in-out;';
                    await delay(256)
                    icon.css = 'font-size: 48px; padding: 12px; padding-right: 16px; min-width: 48px; min-height: 48px;';
                }
            }),
            transitionDuration: 500,
            transition: 'slide_right',
            revealChild: true,
            setup: self => {
                hyprland.connect('changed', () => {
                    var clients = hyprland.clients.filter(x => x.workspace.id == hyprland.active.workspace.id)
                    if(clients.length == 0) {
                        self.reveal_child = true
                    } else {
                        self.reveal_child = false
                    }
                })
            }
        }),
    ]
})

const revealDock = Variable(false)
const lastInteraction = Variable(Date.now());
const mouseIn = Variable(false);
const pose = Variable(false);
const Revealer = () => Widget.Revealer({
    revealChild: revealDock.bind().as(
        x => x || pose.getValue()
    ),
    transitionDuration: 500,
    transition: 'slide_up',
    child: DockLayout(),
    setup: () => {
        Utils.monitorFile('/home/n3rdium/.config/ags/super_key', () => {
            revealDock.setValue(!revealDock.getValue())
            lastInteraction.setValue(Date.now());
        })
        setInterval(() => {
            if(mouseIn.getValue()) {
                lastInteraction.setValue(Date.now());
            }
            if (Date.now() - lastInteraction.getValue() > 512) {
                revealDock.setValue(false);
            }
        }, 1024);
    }
})

const Dock = () => Widget.Window({
    name: `Dock`,
    anchor: ['bottom'],
    margins: [4, 0],
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
    mouseIn.setValue(false)
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
    style: './Dock/style.css',
})

export default Dock