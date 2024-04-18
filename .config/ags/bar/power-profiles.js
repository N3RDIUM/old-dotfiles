const profiles = [
    {
        name: 'Balanced',
        icon: '/home/n3rdium/.config/ags/assets/icons/power-balanced.svg',
        command: 'powerprofilesctl set balanced'
    },
    {
        name: 'Power Saver',
        icon: '/home/n3rdium/.config/ags/assets/icons/power-saver.svg',
        command: 'powerprofilesctl set power-saver'
    },
    {
        name: 'Performance',
        icon: '/home/n3rdium/.config/ags/assets/icons/power-performance.svg',
        command: 'powerprofilesctl set performance'
    }
]
const profile_map = {
    'balanced': 0,
    'power-saver': 1,
    'performance': 2
}
const current = Variable(0);

const PowerProfiles = () => Widget.Button({
    css: "background: rgba(100, 100, 100, 0.64); min-height: 28px; padding-left: 8px; padding-right: 8px; border-radius: 8px; margin-top: 4px; margin-right: 5px; border: solid 1px rgba(200, 200, 200, 0.42);",
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: current.bind().as(x => profiles[x].icon),
                css: 'color: white; font-family: FiraCode; font-size: 14px; margin-right: 4px;'
            }),
            Widget.Label({
                label: current.bind().as(x => profiles[x].name),
                css: 'color: white; font-family: FiraCode; font-size: 12px;'
            })
        ]
    }),
    on_clicked: self => {
        if(current.getValue() + 1 == 3) {
            current.setValue(0)
        } else {
            current.setValue(current.getValue() + 1);
        }
        console.log(profiles[current.getValue()].command)
        Utils.exec(profiles[current.getValue()].command)
    },
    setup: self => {
        setInterval(
            async () => {
                let profile = await Utils.exec('powerprofilesctl get')
                current.setValue(profile_map[profile])
            },
            100
        )
    }
})

export default PowerProfiles;