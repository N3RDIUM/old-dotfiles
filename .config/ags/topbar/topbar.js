import WindowTitle from "../reusable/hyprland-window-title.js";

const TopBar = () => Widget.Window({
    name: `TopBar`,
    class_name: "bar",
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    class_names: ['barwin'],
    child: WindowTitle()
})

export default TopBar;