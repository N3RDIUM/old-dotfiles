const hyprland = await Service.import('hyprland');

function limitString(string) {
    return string.length > 48 ? 
        string.substring(0, 48) + "..." : 
        string;
}

const TitleBar = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    css: "background: rgba(64, 64, 64, 0.6); min-height: 40px; min-width: 480px; border-radius: 4px; margin-top: 4px;",
    center_widget: Widget.Label({
        label: '',
        css: 'color: white; font-family: FiraCode; font-size: 14px;',
        setup: self => {
            hyprland.active.client.connect('changed', async () => {
                self.label = limitString(hyprland.active.client.title);
            })
        }
    })
})

export default TitleBar;