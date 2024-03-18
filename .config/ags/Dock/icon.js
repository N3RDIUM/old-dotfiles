import Gtk from 'gi://Gtk';
import delay from './delay.js'

class AppIcon extends Gtk.Box {
    static {
        Widget.register(this, {
            properties: {
                'icon': ['string', 'rw']
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
            child: Widget.Icon({
                icon: this.icon,
                css: 'font-size: 48px; padding: 8px;'
            }),
            setup: async self => {
                await delay(10)
                self.revealChild = true
            }
        })
        this.add(this.wrapper)
    }
}

export default AppIcon;