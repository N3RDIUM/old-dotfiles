const hyprland = await Service.import('hyprland');
import delay from '../delay.js';

const icons = {
    'kitty': 'kitty',
    'Code': 'visual-studio-code',
    'firefoxdeveloperedition': 'firefox-developer-edition',
    'thunar': 'org.xfce.thunar',
    'discord': 'discord',
    'obsidian': 'obsidian',
    'Chromium': 'chromium'
}

const TitleBar = () => Widget.Revealer({
    transition: 'slide_right',
    transition_duration: 256,
    reveal_child: false,
    child: Widget.CenterBox({
        vertical: false,
        homogeneous: false,
        css: "background: rgba(64, 64, 64, 0.32); min-height: 40px; min-width: 40px; border-radius: 8px; margin-top: 4px; margin-right: 5px;",
        center_widget: Widget.Revealer({
            transition: 'crossfade',
            transition_duration: 128,
            reveal_child: true,
            child: Widget.Icon({
                icon: '',
                css: 'color: white; font-size: 32px;'
            }),
        })
    }),
    setup: self => {
        hyprland.active.client.connect('changed', async () => {
            let window_class = hyprland.active.client.class;
            if(window_class in icons) {
                self.reveal_child = true;
                if(self.get_child().center_widget.get_child().icon != icons[window_class]) {
                    self.get_child().center_widget.reveal_child = false;
                    await delay(64);
                    self.get_child().center_widget.get_child().icon = icons[window_class]
                    self.get_child().center_widget.reveal_child = true;
                }
            } else {
                self.get_child().center_widget.icon = '';
                self.reveal_child = false;
            }
        })
    }
})

export default TitleBar;