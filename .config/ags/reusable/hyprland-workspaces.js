const hyprland = await Service.import('hyprland');

const Workspaces = (
    icon_css,
    workspaces,
    vertical = false,
    css = 'background: black; min-height: 10px; min-width: 10px;'
) => Widget.Box({
    vertical: vertical,
    homogeneous: true,
    css: css,
    children: hyprland.active.workspace.bind('id').as(x => {
        return workspaces.map(i => {
            return Widget.Button({
                child: Widget.Label({
                    label: i.icon,
                    css: i.id != x ? icon_css.inactive : icon_css.active,
                }),
                on_clicked: () => {
                    hyprland.messageAsync(`dispatch workspace ${i.id}`);
                }
            })
        })
    })
})

export default Workspaces;
