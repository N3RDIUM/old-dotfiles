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
        Widget.Label('asdf')
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
    start_widget: LeftLayout(),
    center_widget: CenterLayout(),
    end_widget: RightLayout()
})

const BottomBar = () => Widget.Window({
    name: `BottomBar`,
    anchor: ["bottom", "left", "right"],
    exclusivity: "exclusive",
    class_names: ['barwin'],
    css: 'min-height: 24px; min-width: 24px; background: black;',
    child: Layout()
})

export default BottomBar;