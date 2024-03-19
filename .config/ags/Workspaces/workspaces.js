const hyprland = await Service.import('hyprland')

const mouseIn = Variable(false);

const Workspaces = () => Widget.Window({
    name: `Workspaces`,
    anchor: ['top', 'left'],
    margins: [8, 8],
    css: 'padding: 1px',
    child: Widget.Box({
        css: 'padding: 1px; min-height: 32px; min-width: 320px;',
        child: Widget.EventBox({
            // child: Layout(),
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
    style: './Workspaces/style.css',
})

export default Workspaces