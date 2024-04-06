const LeftPane = () => Widget.Window({
    name: `LeftPane`,
    anchor: ['left'],
    margins: [0, 8],
    css: 'background: transparent;',
    exclusivity: 'exclusive',
    child: Widget.Box({
        css: 'padding: 4px; min-width: 320px; min-height: 1016px; border-radius: 6px; background-color: rgba(255, 255, 255, 1); color: white;',
        child: Widget.Label({
            label: 'I am a left pane',
            css: 'color: black;'
        })
    }),
})

export default LeftPane
