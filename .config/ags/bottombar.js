import Clock from "./reusable/digital-clock.js";
import DateWidget from "./reusable/date.js";

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
    children: [
        Widget.Box({ hexpand: true }),
        DateWidget(
            'margin-right: 8px; margin-top: 2px;', 
            'color: rgba(255, 255, 255, 0.64); font-family: FiraCode; font-size: 16px;',
            'color: white; font-family: FiraCode; font-size: 14px;'
        ),
        Clock('font-family: FiraCode; font-size: 20px;')
    ]
})

// The main box layout thingy for the whole top bar
const Layout = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    css: 'background: rgba(0, 0, 0, 0.1); min-height: 42px; border-radius: 6px; margin: 6px; margin-top: 4px; padding-right: 8px; padding-left: 8px;',
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