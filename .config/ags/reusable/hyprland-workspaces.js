const hyprland = await Service.import('hyprland');

const Workspaces = (
    css,
    workspaces,
    vertical = false,
) => Widget.Box({
    vertical: vertical,
    homogeneous: true,
    css: css.box,
    children: hyprland.active.workspace.bind('id').as(x => {
        return workspaces.map(i => {
            return Widget.Button({
                child: Widget.Label({
                    label: i.icon,
                    css: i.id != x ? css.inactive : css.active,
                }),
                on_clicked: () => {
                    hyprland.messageAsync(`dispatch workspace ${i.id}`);
                }
            })
        })
    })
})

export default Workspaces;
