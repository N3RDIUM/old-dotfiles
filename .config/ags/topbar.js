import WindowTitle from "./reusable/hyprland-window-title.js";
import Workspaces from "./reusable/hyprland-workspaces.js";
import SystemTray from "./reusable/system-tray.js";
import ActiveIcon from "./reusable/hyprland-active-icon.js";
import PowerProfiles from "./reusable/power-profiles.js";
import QuickActions from "./reusable/quick-actions.js";

// CSS stuff for the workspaces widget thing
const ACTIVE_CSS   = "font-size: 20px; color: white; background: transparent; min-width: 32px; min-height: 32px; font-family: FiraCode; padding-right: 3px;";
const INACTIVE_CSS = "font-size: 20px; color: gray; background: transparent; min-width: 32px; min-height: 32px; font-family: FiraCode; padding-right: 3px;";

// Workspaces
const WorkspacesWidget = () => Workspaces({
        active: ACTIVE_CSS,
        inactive: INACTIVE_CSS,
        box: 'background-color: black; min-width: 10px; min-height: 38px; margin-top: 4px; margin-left: 4px; padding-left: 4px; padding-right: 4px; border-radius: 6px;'
    },
    [
        {
            "id": 1,
            "icon": ""
        },
        {
            "id": 2,
            "icon": ""
        },
        {
            "id": 3,
            "icon": "󰈹"
        },
        {
            "id": 4,
            "icon": "󰉋"
        },
        {
            "id": 5,
            "icon": "󰙯"
        },
        {
            "id": 6,
            "icon": ""
        },
        {
            "id": 7,
            "icon": ""
        },
        {
            "id": 8,
            "icon": ""
        },
        {
            "id": 9,
            "icon": ""
        },
        {
            "id": 10,
            "icon": ""
        },
        {
            "id": 11,
            "icon": "󰨇"
        }
    ]
)

// Aligned layouts
const LeftLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: [
        WorkspacesWidget(),
        Widget.Box({ hexpand: true })
    ]
})

const CenterLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: [
        Widget.Box({
            css: 'background-color: black; min-width: 10px; min-height: 38px; margin-top: 4px; margin-right: 2px; padding-left: 10px; padding-right: 10px; border-radius: 6px;',
            child: ActiveIcon('font-family: FiraCode; font-size: 20px;', { 'Code': 'Visual Studio Code' }, 'application-x-executable')
        }),
        Widget.Box({
            css: 'background-color: black; min-width: 10px; min-height: 38px; margin-top: 4px; margin-right: 4px; padding-left: 12px; padding-right: 12px; border-radius: 6px;',
            child: WindowTitle('font-family: FiraCode; font-size: 12px;', '[ N 0 T H 1 N G ]')
        })
    ]
})

const RightLayout = () => Widget.Box({
    vertical: false,
    homogeneous: false,
    spacing: 0,
    children: [
        Widget.Box({ hexpand: true }),
        Widget.Box({
            css: 'background-color: black; min-width: 10px; min-height: 38px; margin-top: 4px; margin-right: 4px; padding-left: 12px; padding-right: 12px; border-radius: 6px;',
            child: PowerProfiles(
                { 'performance': '󰡴', 'balanced': '󰊚', 'power-saver': '󰡳' },
                'font-family: FiraCode; font-size: 20px; margin-right: 8px;',
                'font-family: FiraCode; font-size: 12px;'
            )
        }),
        SystemTray(
            'background-color: black; min-width: 10px; min-height: 38px; margin-top: 4px; margin-right: 4px; padding-left: 4px; padding-right: 4px; border-radius: 6px;',
            'font-size: 20px; min-width: 32px; min-height: 32px;'
        ),
        QuickActions(
            [
                { icon: '󰂚', tooltip: 'Notification Centre', action: () => { console.log('TODO: Notification Centre') } },
                { icon: '', tooltip: 'Quick Settings', action: () => { console.log('TODO: Quick Settings') } },
                // { icon: '', tooltip: 'Lock Screen', action: () => { console.log('TODO: Lock Screen') } },
                // { icon: '', tooltip: 'Reboot', action: () => { Utils.execAsync('shutdown -r') } },
                // { icon: '', tooltip: 'Power Off', action: () => { Utils.execAsync('shutdown now') } },
            ], 
            'background-color: black; min-width: 10px; min-height: 38px; margin-top: 4px; margin-right: 4px; padding-left: 10px; padding-right: 4px; border-radius: 6px;',
            'font-size: 20px; margin-right: 14px;',
        )
    ]
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

const TopBar = () => Widget.Window({
    name: `TopBar`,
    class_name: "bar",
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    class_names: ['barwin'],
    child: Layout()
})

export default TopBar;