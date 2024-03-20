const hyprland = await Service.import('hyprland')

// TODO: Go to workspace on mouse click
const Layout = () => Widget.Box({
    vertical: false,
    homogeneous: true,
    css: 'padding-left: 4px; padding-right:4px;',
    children: [
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/code.svg',
                css: 'font-size: 32px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 1) {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/terminal.svg',
                css: 'font-size: 32px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 2) {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/web.svg',
                css: 'font-size: 34px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 3) {
                            self.css = 'font-size: 34px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 34px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/files.svg',
                css: 'font-size: 34px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 4) {
                            self.css = 'font-size: 34px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 34px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/chat.svg',
                css: 'font-size: 32px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 5) {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/music.svg',
                css: 'font-size: 28px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 6) {
                            self.css = 'font-size: 28px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 28px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/astro.svg',
                css: 'font-size: 32px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 7) {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 32px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/notes.svg',
                css: 'font-size: 28px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 8) {
                            self.css = 'font-size: 28px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 28px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/other.svg',
                css: 'font-size: 34px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 9) {
                            self.css = 'font-size: 34px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 34px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        }),
        Widget.Button({
            child: Widget.Icon({
                icon: '/home/n3rdium/.config/ags/Workspaces/icons/dashboard.svg',
                css: 'font-size: 28px; padding-left: 4px; padding-right: 4px;',
                setup: self => {
                    hyprland.active.workspace.connect('changed', () => {
                        if(hyprland.active.workspace.id == 10) {
                            self.css = 'font-size: 28px; padding-left: 4px; padding-right: 4px; background: rgba(200, 200, 200, 0.8); border-radius: 4px;';
                        } else {
                            self.css = 'font-size: 28px; padding-left: 4px; padding-right: 4px;';
                        }
                    })
                }
            })
        })
    ]
})

const mouseIn = Variable(true);
const revealWorkspaces = Variable(false);
const lastInteraction = Variable(Date.now());
const Revealer = () => Widget.Revealer({
    revealChild: revealWorkspaces.bind(),
    transitionDuration: 500,
    transition: 'slide_left',
    css: 'padding: 4px; padding-top: 8px; padding-bottom: 8px;',
    child: Layout(),
    setup: self => {
        setInterval(() => {
            if(mouseIn.getValue()) {
                lastInteraction.setValue(Date.now());
            }
            if (Date.now() - lastInteraction.getValue() > 1024) {
                revealWorkspaces.setValue(false);
            }
        }, 1024);

        hyprland.active.workspace.connect('changed', async () => {
            revealWorkspaces.setValue(true);
            lastInteraction.setValue(Date.now());
        });
    }
})

const Workspaces = () => Widget.Window({
    name: `Workspaces`,
    anchor: ['top', 'left'],
    margins: [8, 8],
    css: 'padding: 1px;'
        + 'background-color: rgba(0.8, 0.8, 0.8, 0.32)',
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

export default Workspaces