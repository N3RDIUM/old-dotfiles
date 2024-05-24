// Aligned layouts
const LeftLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: []
})

const CenterLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: [
        Widget.Label('WIP')
    ]
})

const RightLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: []
})

// The main box layout thingy for the whole top bar
const Layout = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    css: 'background: rgba(0, 0, 0, 0.1); min-height: 42px; border-radius: 6px; margin: 6px; margin-top: 4px;',
    start_widget: LeftLayout(),
    center_widget: CenterLayout(),
    end_widget: RightLayout()
})

const BottomBar = () => Widget.Window({
    name: `BottomBar`,
    anchor: ["bottom", "left", "right"],
    exclusivity: "exclusive",
    class_names: ['barwin'],
    child: Layout()
})

export default BottomBar;