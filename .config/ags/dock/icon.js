import Gtk from 'gi://Gtk';
import delay from '../delay.js'

class AppIcon extends Gtk.Box {
    static {
        Widget.register(this, {
            properties: {
                'icon': ['string', 'rw'],
                'actions': ['jsobject', 'rw']
            }
        })
    }

    constructor(props) {
        super(props);

        this.pid = props.pid;
        this.icon = props.icon;

        this.wrapper = Widget.Revealer({
            revealChild: false,
            transitionDuration: 512,
            transition:'slide_left',
            child: Widget.EventBox({
                child: Widget.Icon({
                    icon: this.icon,
                    css: 'font-size: 56px; min-width: 96px; min-height: 96px;'
                }),
                onPrimaryClick: async self => {
                    let icon = self.get_child();
                    icon.css = 'font-size: 50px; min-width: 96px; min-height: 96px; animation: shrink-in 0.128s ease-in-out;';
                },
                onPrimaryClickRelease: async self => {
                    let icon = self.get_child();
                    icon.css = 'font-size: 56px; min-width: 96px; min-height: 96px; animation: shrink-out 0.128s ease-in-out;';
                    this.actions['call']()
                }
            }),
            setup: async self => {
                await delay(10)
                self.reveal_child = true
            }
        })
        this.add(this.wrapper)
    }
}

export default AppIcon;