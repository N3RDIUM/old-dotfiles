// import WindowTitle from "../reusable/hyprland-window-title.js";
import Workspaces from "../reusable/hyprland-workspaces.js";

// CSS stuff for the workspaces widget thing
const ACTIVE_CSS   = "font-size: 20px; color: white; background: black; min-width: 32px; min-height: 32px; font-family: FiraCode; padding-right: 3px;";
const INACTIVE_CSS = "font-size: 20px; color: black; background: white; min-width: 32px; min-height: 32px; font-family: FiraCode; padding-right: 3px;";

// Workspaces
const WorkspacesWidget = Workspaces({
        active: ACTIVE_CSS,
        inactive: INACTIVE_CSS,
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

const TopBar = () => Widget.Window({
    name: `TopBar`,
    class_name: "bar",
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    class_names: ['barwin'],
    css: "min-height: 128px; min-width: 128px;",
    child: WorkspacesWidget
})

export default TopBar;