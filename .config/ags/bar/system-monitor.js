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

const temp = Variable("0", {
    poll: [100, 'python -c \'import psutil; print(psutil.sensors_temperatures()["coretemp"][0].current)\'', out => Number(out).toFixed(0).toString()]
})

const disc = Variable(0, {
    poll: [60000, 'python -c \'import os; statvfs = os.statvfs("/home/n3rdium"); print(int(statvfs.f_frsize * statvfs.f_bfree / 1000000000))\'', out => out]
})

const SystemMonitor = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: "background: rgba(64, 64, 64, 0.32); min-height: 40px; padding-left: 4px; padding-right: 4px; border-radius: 8px; margin-top: 4px; margin-right: 5px;",
    children: [
        Widget.Box({
            css: 'margin-right: 4px;',
            child: Widget.CircularProgress({
                css: 'min-width: 32px; min-height: 32px; font-size: 2px; margin: 4px; background: transparent; color: white;',
                rounded: true,
                inverted: false,
                startAt: 0.75,
                value: cpu.bind().as(p => p),
                child: Widget.Icon({
                    icon: '/home/n3rdium/.config/ags/assets/icons/cpu.svg',
                    css: 'color: white; font-family: FiraCode; font-size: 16px;'
                }),
            }),
        }),
        Widget.Box({
            css: 'margin-right: 4px;',
            child: Widget.CircularProgress({
                css: 'min-width: 32px; min-height: 32px; font-size: 2px; margin: 4px; background: transparent; color: white;',
                rounded: true,
                inverted: false,
                startAt: 0.75,
                value: ram.bind().as(p => p),
                child: Widget.Icon({
                    icon: '/home/n3rdium/.config/ags/assets/icons/ram.svg',
                    css: 'color: white; font-family: FiraCode; font-size: 16px;'
                }),
            }),
        }),
        Widget.Box({
            children: [
                Widget.Icon({
                    icon: '/home/n3rdium/.config/ags/assets/icons/disc.svg',
                    css: 'color: white; font-family: FiraCode; font-size: 24px; margin-right: 4px; margin-left: 4px;'
                }),
                Widget.Label({
                    label: disc.bind().as(x => x.toString() + 'GB'),
                    css: 'color: white; font-family: FiraCode; font-size: 14px; margin-right: 4px;'
                })
            ]
        }),
        Widget.Box({
            children: [
                Widget.Icon({
                    icon: '/home/n3rdium/.config/ags/assets/icons/thermal.svg',
                    css: 'color: white; font-family: FiraCode; font-size: 24px;'
                }),
                Widget.Label({
                    label: temp.bind().as(x => x + "°C"),
                    css: 'color: white; font-family: FiraCode; font-size: 14px; margin-right: 4px;'
                })
            ]
        }),
    ]
})

export default SystemMonitor;