import TitleBar from "./titlebar.js";
import WindowIcon from "./windowicon.js";

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
        // start_widget: Widget.Box({
        //     children: [
        //         TitleBar(),
        //         Widget.Box({ hexpand: true })
        //     ]
        // }),
        center_widget: Widget.Box({
            children: [
                WindowIcon(),
                TitleBar(),
            ]
        }),
        // end_widget: Widget.Box({
        //     children: [
        //         Widget.Box({ hexpand: true }),
        //         TitleBar()
        //     ]
        // })
    }),
})

export default Bar
