// @ts-nocheck
import delay from '../delay.js';

// @ts-nocheck
const hyprland = await Service.import('hyprland')
const systemtray = await Service.import('systemtray')

function limitString(str, limit=42) {
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
    css: 'font-family: Fira Code; font-size: 12px; font-weight: thin;',
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
            self.label = Utils.exec('date +"%d/%m %H:%M"')
        }, 1000)
    }
}) 

const layoutCSS = 'border-radius: 6px; background-color: rgba(69, 69, 69, 0.32); border: solid 2px rgba(160, 160, 160, 0.95); color: white;'

const StatusLayout = () => Widget.CenterBox({
    vertical: false,
    css: 'min-width: 512px; min-height: 24px; padding: 4px;' + layoutCSS,
    start_widget: Widget.Label({
        label: '[' + Utils.exec('whoami').toUpperCase() + ']',
        css: 'font-family: Fira Code; font-size: 16px; font-weight: bold;',
    }),
    center_widget: WindowTitle(),
    end_widget: Time()
})

// TODO: Go to workspace on mouse click
// TODO: Bugfix- icon bg disappears on click
const WorkspacesLayout = () => Widget.Box({
    vertical: false,
    homogeneous: true,
    css: 'padding:4px; ' + layoutCSS,
    children: [
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/code.svg',
                css: 'font-size: 24px; padding-left: 2px; padding-right: 2px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 1) {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/terminal.svg',
                css: 'font-size: 24px; padding-left: 2px; padding-right: 2px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 2) {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 32px; min-height: 32px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 32px; min-height: 32px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/web.svg',
                css: 'font-size: 24px; padding-left: 2px; padding-right: 2px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 3) {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/files.svg',
                css: 'font-size: 24px; padding-left: 2px; padding-right: 2px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 4) {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/chat.svg',
                css: 'font-size: 24px; padding-left: 2px; padding-right: 2px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 5) {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/music.svg',
                css: 'font-size: 24px; margin-left: 4px; margin-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 6) {
                            self.css = 'font-size: 20px; margin-left: 4px; margin-right: 4px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 20px; margin-left: 4px; margin-right: 4px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/astro.svg',
                css: 'font-size: 24px; margin-left: 4px; margin-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 7) {
                            self.css = 'font-size: 24px; margin-left: 4px; margin-right: 4px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; margin-left: 4px; margin-right: 4px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/notes.svg',
                css: 'font-size: 24px; margin-left: 4px; margin-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 8) {
                            self.css = 'font-size: 20px; margin-left: 4px; margin-right: 4px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 20px; margin-left: 4px; margin-right: 4px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/other.svg',
                css: 'font-size: 24px; margin-left: 4px; margin-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 9) {
                            self.css = 'font-size: 24px; margin-left: 4px; margin-right: 4px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 24px; margin-left: 4px; margin-right: 4px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/dashboard.svg',
                css: 'font-size: 20px; margin-left: 4px; margin-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 10) {
                            self.css = 'font-size: 20px; margin-left: 4px; margin-right: 4px; background: rgba(169, 169, 169, 0.95); border-radius: 6px;';
                        } else {
                            self.css = 'font-size: 20px; margin-left: 4px; margin-right: 4px;';
                        }
                    })
                }
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 20px; padding-left: 2px; padding-right: 2px;; min-width: 24px; min-height: 24px; animation: shrink-once20 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 20px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        })
    ]
})

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

const SystemMonitor = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'margin-left: 6px; min-width: 40px; padding: 4px; padding-left: 6px; padding-right: 6px;' + layoutCSS,
    children: [
        Widget.Icon({
            icon: '/home/n3rdium/.config/ags/StatusBar/icons/cpu.svg',
            css: 'font-size: 24px; margin-right: 4px;'
        }),
        Widget.Label({
            label: cpu.bind().as(x => Math.round(x * 100).toString() + '%'),
            css: 'min-width: 32px;'
        }),
        Widget.Icon({
            icon: '/home/n3rdium/.config/ags/StatusBar/icons/ram.svg',
            css: 'font-size: 32px; margin-left: 6px; margin-right: 4px;'
        }),
        Widget.Label({
            label: ram.bind().as(x => Math.round(x * 100).toString() + '%'),
            css: 'min-width: 32px;'
        }),
        Widget.Icon({
            icon: '/home/n3rdium/.config/ags/StatusBar/icons/disc.svg',
            css: 'font-size: 24px; margin-left: 6px; margin-right: 4px;'
        }),
        Widget.Label({
            label: disc.bind().as(x => Math.round(x).toString() + 'GB'),
            css: 'min-width: 48px;'
        })
    ]
})

/** @param {import('types/service/systemtray').TrayItem} item */
const SysTrayItem = item => Widget.Button({
    child: Widget.Revealer({
        child: Widget.Icon({
            css: 'font-size: 24px; margin-left: 6px; margin-right: 6px; min-width: 24px; min-height: 24px;',
        }).bind('icon', item, 'icon'),
        reveal_child: false,
        transition: 'slide_right',
        transition_duration: 500,
        setup: async self => {
            await delay(100)
            self.reveal_child = true;
        }
    }),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: async (_, event) => {
        item.activate(event)
        let icon = _.get_child().get_child()
        icon.css = 'font-size: 24px; margin-left: 6px; margin-right: 6px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
        await delay(256)
        icon.css = 'font-size: 24px; margin-left: 6px; margin-right: 6px; min-width: 24px; min-height: 24px;';
    },
    onSecondaryClick: (_, event) => item.openMenu(event),
});

const SystemTray = () => Widget.Box({
    css: 'margin-left: 6px; margin-right: 6px;' + layoutCSS,
    children: systemtray.bind('items').as(i => i.map(SysTrayItem))
})

// TODO: Figure out a better name :)
const Rightmost = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    css: 'margin-left: 6px; margin-right: 6px;' + layoutCSS,
    children: [
        Widget.Box({ hexpand: true }),
        Widget.Button({
            child: Widget.Icon({
                css: 'font-size: 24px; padding-left: 6px; padding-right: 6px; min-width: 24px; min-height: 24px;',
                icon: '/home/n3rdium/.config/ags/StatusBar/icons/gear.svg',
            }),
            on_clicked: async self => {
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 6px; padding-right: 6px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 6px; padding-right: 6px; min-width: 24px; min-height: 24px;';
            }
        })
    ]
})

const LeftLayout = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    start_widget: WorkspacesLayout(),
    center_widget: SystemMonitor(),
    end_widget: Widget.Box({ hexpand: true }),
})

const RightLayout = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    start_widget: Widget.Box({ hexpand: true }),
    center_widget: SystemTray(),
    end_widget: Rightmost()
})

const Layout = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    css: 'min-width: 1908px;  min-height: 32px;',
    start_widget: LeftLayout(),
    center_widget: StatusLayout(),
    end_widget: RightLayout(),
})

const StatusBar = () => Widget.Window({
    name: `StatusBar`,
    anchor: ['top', 'left', 'right'],
    margins: [4, 4],
    css: 'padding: 1px;',
    exclusivity: 'exclusive',
    css: 'background: transparent; border: solid 0px white;',
    child: Widget.Box({
        css: 'padding: 4px;',
        child: Layout()
    }),
})

App.config({
    style: './style.css',
})

export default StatusBar