const Workspaces = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    css: "background: rgba(100, 100, 100, 0.48); min-height: 28px; padding-left: 8px; padding-right: 8px; border-radius: 8px; margin-top: 4px; margin-right: 5px; border: solid 1px rgba(200, 200, 200, 0.42);",
    center_widget: Widget.Label({
        label: 'Workspaces',
        css: 'color: white; font-family: FiraCode; font-size: 12px;'
    })
})

export default Workspaces;