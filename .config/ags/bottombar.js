import Clock from "./reusable/digital-clock.js";
import DateWidget from "./reusable/date.js";
import QuickActions from "./reusable/quick-actions.js";
import CPUMonitor from "./reusable/cpu-monitor.js";
import RAMMonitor from "./reusable/ram-monitor.js";
import CoreTemp from "./reusable/core-temperature.js";
import DiskSpace from "./reusable/disk-space.js";

// Aligned layouts
const LeftLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: [
        
    ]
})

const CenterLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: []
})

const RightLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: [
        Widget.Box({ hexpand: true }),
        CPUMonitor(),
        Widget.Box({ css: 'min-width: 6px;' }),
        Widget.Box({
            css: 'margin-top: 4px;',
            vertical: true,
            children: [
                CoreTemp(),
                DiskSpace()
            ]
        }),
        Widget.Box({ css: 'min-width: 6px;' }),
        RAMMonitor(),
        Widget.Box({ css: 'min-width: 6px;' }),
        DateWidget(
            'margin-top: 2px; margin-right: 8px;', 
            'color: rgba(255, 255, 255, 0.8); font-family: FiraCode; font-size: 14px;',
            'color: white; font-family: FiraCode; font-size: 14px;'
        ),
        Clock('font-family: FiraCode; font-size: 28px;'),
        Widget.Separator({
            vertical: true,
            class_names: ['sep']
        }),
        QuickActions(
            [
                { icon: '', tooltip: 'Settings', action: () => { console.log('TODO: Settings (w/ passwd auth)') } }
            ], 
            'margin-left: 4px;',
            'font-size: 20px; margin-right: 8px;',
        )
    ]
})

// The main box layout thingy for the whole top bar
const Layout = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    css: 'background: rgba(0, 0, 0, 0.1); min-height: 42px; border-radius: 8px; margin: 6px; margin-top: 4px; padding-right: 8px; padding-left: 8px;',
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