const hyprland = await Service.import('hyprland');

function limitString(string) {
    return string.length > 64 ? 
        string.substring(0, 64) + "..." : 
        string;
}

const TitleBar = () => Widget.CenterBox({
    vertical: false,
    homogeneous: false,
    css: "background: rgba(100, 100, 100, 0.8); min-height: 28px; min-width: 480px; border-radius: 8px; margin-top: 4px; border: solid 1px rgba(200, 200, 200, 0.42);",
    center_widget: Widget.Label({
        label: '',
        css: 'color: white; font-family: FiraCode; font-size: 12px;',
        setup: self => {
            hyprland.active.client.connect('changed', async () => {
                if(hyprland.active.client.title != '') {
                    self.label = limitString(hyprland.active.client.title);
                } else {
                    self.label = "[-] Nothing [-]"
                }
            })
        }
    })
})

export default TitleBar;