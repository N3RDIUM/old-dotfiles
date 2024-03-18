import windiff from './app_getter.js'

windiff.connect('opened', (service, ...args) => {
    if(args[0].pid == -1) { return }
    print(args[0].pid, args[0].details.icon, 'opened')
})
windiff.connect('closed', (service, ...args) => {
    if(args[0].pid == -1) { return }
    print(args[0].pid, args[0].details.icon, 'closed')
})

const DockLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'padding: 8px',
    children: [
        Widget.Icon({
            icon: '/home/n3rdium/.config/ags/Dock/icons/grid.svg',
            css: 'font-size: 64px; padding: 4px;'
        }),
        Widget.Separator({
            css: 'background: #ededed; min-width: 4px; border-radius: 2px; margin-left: 4px; margin-right: 4px;'
        })
    ]
})

const revealDock = Variable(true)
const Revealer = () => Widget.Revealer({
    revealChild: revealDock.bind(),
    transitionDuration: 500,
    transition: 'slide_up',
    child: DockLayout()
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