const hyprland = await Service.import('hyprland');
const applications = await Service.import('applications');

function getClientInfo(client) {
    for (const app of applications.list) {
        if (client.title && app.match(client.title) ||
            client.class && app.match(client.class)) {
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

const pins = [
    'Visual Studio Code'
]; // TODO: Move to config.json
const Pinned = () => Widget.Box({
    vertical: false,
    homogeneous: true,
    children: pins.map((name) => {
        return Widget.CenterBox({
            center_widget: Widget.Button({
                child: Widget.Icon({
                    icon: getInfo(name)?.icon_name?.toString() || '',
                    css: 'font-size: 64px;'
                }),
                onClicked: async () => {
                    getInfo(name)?.launch()
                }
            }),
            css: 'min-width: 96px; min-height: 96px;',
        });
    }),
    setup: self => {
        console.log(self.children)
    }
})

const Dock = () => Widget.Window({
    name: `Bar`,
    anchor: ['bottom'],
    margins: [8, 0],
    css: 'background: transparent; ',
    exclusivity: 'ignore',
    child: Widget.Box({
        child: Widget.Revealer({
            transition: "slide_up",
            transition_duration: 400,
            reveal_child: false,
            css: 'min-height: 1px',
            child: Widget.Box({
                css: 'min-width: 96px; min-height: 96px; border-radius: 8px; background: black;',
                children: [
                    Pinned(),
                ]
            }),
            setup: self => {
                hyprland.active.workspace.connect('changed', async () => {
                    for(let workspace of hyprland.workspaces) {
                        if(workspace.id == hyprland.active.workspace.id) {
                            if(workspace.windows == 0) {
                                self.reveal_child = true;
                            } else {
                                self.reveal_child = false;
                            }
                        }
                    }
                })
            }
        }),
        css: 'padding: 1px;'
    })
})

export default Dock;