import TitleBar from "./titlebar.js";
import WindowIcon from "./windowicon.js";
import Workspaces from "./workspaces.js";
import Windows from "./windows.js";
import Time from "./time.js";
import SystemMonitor from "./system-monitor.js";
import PowerProfiles from "./power-profiles.js";

const Bar = () => Widget.Window({
    name: `Bar`,
    anchor: ['top', 'left', 'right'],
    margins: [0, 8],
    css: 'background: transparent;',
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        css: 'background: transparent;',
        vertical: false,
        homogeneous: false,
        start_widget: Widget.Box({
            children: [
                Workspaces(),
                Windows(), // Who's gonna stop me?
                Widget.Box({ hexpand: true })
            ]
        }),
        center_widget: Widget.Box({
            children: [
                WindowIcon(),
                TitleBar(),
            ]
        }),
        end_widget: Widget.Box({
            children: [
                Widget.Box({ hexpand: true }),
                PowerProfiles(),
                SystemMonitor(),
                Time()
            ]
        })
    }),
})

export default Bar
