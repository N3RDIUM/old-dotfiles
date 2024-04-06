const BottomPane = () => Widget.Window({
    name: `BottomPane`,
    anchor: ['bottom'],
    margins: [8, 8],
    css: 'background: transparent;',
    exclusivity: 'exclusive',
    child: Widget.Box({
        css: 'padding: 4px; min-width: 1894px; min-height: 384px; border-radius: 6px; background-color: rgba(255, 255, 255, 1); color: white;',
        child: Widget.Label({
            label: 'I am a bottom pane',
            css: 'color: black;'
        })
    }),
})

export default BottomPane
