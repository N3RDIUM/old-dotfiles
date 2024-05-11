const hyprland = await Service.import('hyprland');

function limitString(string) {
    return string.length > 64 ? 
        string.substring(0, 64) + "..." : 
        string;
}

const title = Variable('')
const TitleBar = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    css: "background: black; min-height: 36px; border-radius: 6px; margin-top: 4px; padding-left: 12px; padding-right: 12px;",
    center_widget: Widget.Label({
        label: title.bind(),
        css: 'color: white; font-family: FiraCode; font-size: 12px;',
        setup: self => {
            hyprland.active.client.connect('changed', async () => {
                if(hyprland.active.client.title != '') {
                    title.setValue(limitString(hyprland.active.client.title));
                } else {
                    title.setValue("[-] Nothing [-]");
                }
            })
        }
    }),
})

export default TitleBar;