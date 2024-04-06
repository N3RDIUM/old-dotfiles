const Bar = () => Widget.Window({
    name: `Bar`,
    anchor: ['top', 'left', 'right'],
    margins: [0, 8],
    css: 'background: transparent;',
    exclusivity: 'exclusive',
    child: Widget.Box({
        css: 'padding: 4px; min-height: 24px; border-radius: 6px; background-color: rgba(255, 255, 255, 1); color: white; margin-top: 8px;',
        child: Widget.Label({
            label: 'I am a bar',
            css: 'color: black;'
        })
    }),
})

export default Bar
