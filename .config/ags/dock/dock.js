import Icon from './icon.js';
import delay from '../delay.js'
import windiff from './windiff_service.js'

const hyprland = await Service.import('hyprland');
const applications = await Service.import('applications');

const aliases = {
    "Code": "Visual Studio Code"
}; // TODO: Move to config.json
function getClientInfo(client) {
    for (const app of applications.list) {
        let cls = client.class;

        if(cls in aliases) {
            cls = aliases[cls];
        }

        if (client.title && app.match(client.title) ||
            client.class && app.match(cls)
        ) {
            return app
        }
    }
    return null;
}
function getInfo(appName) {
    for (const app of applications.list) {
        if (app.match(appName) ||app.match(appName)) {
            return app
        }
    }
    return null;
}

const taskbarIcons = Variable({});
const iconLock = Variable(false);
const revealDock = Variable(false);
const lastInteraction = Variable(Date.now());
const mouseIn = Variable(false);
const emptyWorkspace = Variable(false);

windiff.connect('opened', (service, ...args) => {
    if(args[0].pid == -1) { return }
    let icons = taskbarIcons.getValue()
    iconLock.setValue(true)
    icons[args[0].pid] = new Icon({ icon: getClientInfo(hyprland.active.client)?.icon_name || '' })
    taskbarIcons.setValue(icons)
    iconLock.setValue(false);
    lastInteraction.setValue(Date.now());
    revealDock.setValue(true);
    mouseIn.setValue(false);
})
windiff.connect('closed', async (service, ...args) => {
    if(args[0].pid == -1) { return }
    let icons = taskbarIcons.getValue()
    icons[args[0].pid].get_children()[0].revealChild = false
    await delay(1024)
    while(iconLock) {await delay(128)}
    iconLock.setValue(true)
    delete icons[args[0].pid]
    taskbarIcons.setValue(icons)
    iconLock.setValue(false);
    lastInteraction.setValue(Date.now());
    revealDock.setValue(true);
    mouseIn.setValue(false);
})

const Taskbar = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding-right: 8px;',
    children: taskbarIcons.bind().as(x => Object.values(x))
})

const pins = [
    'Visual Studio Code',
    'kitty'
]; // TODO: Move to config.json
const Pinned = () => Widget.Box({
    vertical: false,
    homogeneous: true,
    children: pins.map((name) => {
        return Widget.Button({
            child: new Icon({ icon: getInfo(name)?.icon_name?.toString() || '' }),
            onClicked: async self => {
                getInfo(name)?.launch()
            }
        })
    })
})

const Separator = () => Widget.Separator({
    css: 'min-width: 4px; background: #484848; margin: 8px; border-radius: 2px;'
})

hyprland.active.connect('changed', () => {
    mouseIn.setValue(false)
})

const Dock = () => Widget.Window({
    name: `Dock`,
    anchor: ['bottom'],
    margins: [8, 0],
    css: 'background: transparent;',
    exclusivity: 'ignore',
    child: Widget.Box({
        child: Widget.Revealer({
            transition: "slide_up",
            transition_duration: 400,
            reveal_child: revealDock.bind().as(x => x || emptyWorkspace.getValue()),
            css: 'min-height: 1px',
            child: Widget.EventBox({
                child: Widget.Box({
                    css: 'min-width: 96px; min-height: 96px; border-radius: 8px; background: rgba(0, 0, 0, 0.24);',
                    children: [
                        Pinned(),
                        Separator(),
                        Taskbar()
                    ]
                }),
                onHover: () => {
                    mouseIn.setValue(true)
                },
                onHoverLost: () => {
                    mouseIn.setValue(false)
                }
            }),
            setup: self => {
                setInterval(() => {
                    if(mouseIn.getValue()) {
                        lastInteraction.setValue(Date.now());
                    }
                    if (Date.now() - lastInteraction.getValue() > 1024) {
                        revealDock.setValue(false);
                    }
                    for(let workspace of hyprland.workspaces) {
                        if(workspace.id == hyprland.active.workspace.id) {
                            if(workspace.windows == 0) {
                                emptyWorkspace.setValue(true);
                            } else {
                                emptyWorkspace.setValue(false);
                            }
                        }
                    }
                }, 1024);
                Utils.monitorFile('/home/n3rdium/.config/ags/super_key', () => {
                    revealDock.setValue(!revealDock.getValue())
                    lastInteraction.setValue(Date.now());
                })
            }
        }),
        css: 'padding: 1px;'
    })
})

export default Dock;