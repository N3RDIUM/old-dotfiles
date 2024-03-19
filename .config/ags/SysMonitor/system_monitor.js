// @ts-nocheck
const hyprland = await Service.import('hyprland');

const divide = ([total, free]) => free / total

const cpu = Variable(0, {
    poll: [1000, 'top -b -n 1', out => divide([100, out.split('\n')
        .find(line => line.includes('Cpu(s)'))
        .split(/\s+/)[1]
        .replace(',', '.')])],
})

const ram = Variable(0, {
    poll: [1000, 'free', out => divide(out.split('\n')
        .find(line => line.includes('Mem:'))
        .split(/\s+/)
        .splice(1, 2))],
})
const disc = Variable(0, {
    poll: [60000, 'python -c \'import os; statvfs = os.statvfs("/home/n3rdium"); print(int(statvfs.f_frsize * statvfs.f_bfree / 1000000000))\'', out => out]
})

const Display = () => Widget.CenterBox({
    vertical: true,
    homogeneous: true,
    start_widget: Widget.Label({
        label: cpu.bind().as(x => 'CPU: ' + Number(x * 100).toPrecision(2).toString() + '%')
    }),
    center_widget: Widget.Label({
        label: ram.bind().as(x => 'RAM: ' + Number(x * 100).toPrecision(2).toString() + '%')
    }),
    end_widget: Widget.Label({
        label: disc.bind().as(x => 'SSD: ' + Number(x).toString() + 'GB')
    })
})

const MonitorLayout = () => Widget.Box({
    css: 'padding: 8px; min-height: 64px; margin: 8px',
    vertical: false,
    children: [
        Display()
    ]
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
            if (Date.now() - lastInteraction.getValue() > 8192) {
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
    style: './style.css',
})

export default Monitor