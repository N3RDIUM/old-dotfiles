const hyprland = await Service.import('hyprland');

const MonitorLayout = () => Widget.Box({
    css: 'padding: 8px',
    child: Widget.Icon({
        icon: '/home/n3rdium/.config/ags/Dock/icons/grid.svg',
        css: 'font-size: 48px; padding: 12px; padding-right: 18px;'
    }),
})

const revealMonitor = Variable(true);
const lastInteraction = Variable(Date.now());
const mouseIn = Variable(false);
const Revealer = () => Widget.Revealer({
    revealChild: revealMonitor.bind(),
    transitionDuration: 500,
    transition: 'slide_right',
    child: MonitorLayout(),
    setup: self => {
        Utils.monitorFile('/home/n3rdium/.config/ags/monitor_key', () => {
            revealMonitor.setValue(!revealMonitor.getValue())
            lastInteraction.setValue(Date.now());
        })
        setInterval(() => {
            if(mouseIn.getValue()) {
                lastInteraction.setValue(Date.now());
            }
            if (Date.now() - lastInteraction.getValue() > 2048) {
                revealMonitor.setValue(false);
            }
        }, 1024);

        hyprland.active.connect('changed', async () => {
            revealMonitor.setValue(false);
        });
    }
})

const Monitor = () => Widget.Window({
    name: `SystemMonitor`,
    anchor: ['bottom', 'left'],
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

App.config({
    style: './Media/style.css',
})

export default Monitor