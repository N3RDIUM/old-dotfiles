const audio = await Service.import('audio')
const mpris = await Service.import('mpris')

const Media = () => Widget.Window({
    name: `Media`,
    anchor: ['top', 'left'],
    margins: [5, 8],
    css: "background: rgba(100, 100, 100, 0.48); border-radius: 8px;",
    child: Widget.Label({
        label: 'Hi',
        css: 'color: white; font-family: FiraCode; font-size: 14px; min-width: 318px; min-height: 100px;'
    })
})

export default Media;
