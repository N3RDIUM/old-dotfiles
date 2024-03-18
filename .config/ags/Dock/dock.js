import AppIcon from './icon.js'
import windiff from './app_getter.js'
import delay from './delay.js'

const taskbarIcons = Variable({})

windiff.connect('opened', (service, ...args) => {
    if(args[0].pid == -1) { return }
    if(args[0].details.icon) {
        let icons = taskbarIcons.getValue()
        icons[args[0].pid] = new AppIcon({
            icon: args[0].details.icon
        })
        taskbarIcons.setValue(icons)
    }
    console.log(Object.values(taskbarIcons.getValue()))
})
windiff.connect('closed', async (service, ...args) => {
    if(args[0].pid == -1) { return }
    let icons = taskbarIcons.getValue()
    icons[args[0].pid].get_children()[0].revealChild = false
    await delay(1024)
    delete icons[args[0].pid]
    taskbarIcons.setValue(icons)
})

const Taskbar = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding: 8px',
    children: taskbarIcons.bind().as(x => Object.values(x))
})

const DockLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding: 8px',
    children: [
        Widget.Icon({
            icon: '/home/n3rdium/.config/ags/Dock/icons/grid.svg',
            css: 'font-size: 48px; padding: 12px;'
        }),
        Widget.Separator({
            css: 'background: #ededed; min-width: 4px; border-radius: 2px; margin-left: 8px; margin-right: 4px;'
        }),
        Taskbar()
    ]
})

const revealDock = Variable(false)
const Revealer = () => Widget.Revealer({
    revealChild: revealDock.bind(),
    transitionDuration: 500,
    transition: 'slide_up',
    child: DockLayout(),
    setup: self => {
        Utils.monitorFile('/home/n3rdium/.config/ags/super_key', () => {
            revealDock.setValue(!revealDock.getValue())
        })
    }
})

const Dock = () => Widget.Window({
    name: `Dock`,
    anchor: ['bottom'],
    margins: [24, 0],
    css: 'padding: 1px',
    child: Widget.Box({
        css: 'padding: 1px;',
        child: Revealer(),
    }),
})

App.config({
    style: './Dock/style.css',
})

export default Dock