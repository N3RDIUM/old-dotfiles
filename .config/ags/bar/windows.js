const Windows = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    css: "background: rgba(64, 64, 64, 0.6); min-height: 40px; padding-left: 8px; padding-right: 8px; border-radius: 4px; margin-top: 4px;",
    center_widget: Widget.Label({
        label: 'Windows :D',
        css: 'color: white; font-family: FiraCode; font-size: 14px;'
    })
})

export default Windows;