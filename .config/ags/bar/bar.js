const Bar = () => Widget.Window({
    name: `StatusBar`,
    anchor: ['top', 'left', 'right'],
    margins: [4, 4],
    css: 'padding: 1px; background: transparent; border: solid 0px white;',
    exclusivity: 'exclusive',
    child: Widget.Box({
        css: 'padding: 4px;',
        child: Widget.Label('Hi there!')
    }),
})

export default Bar
