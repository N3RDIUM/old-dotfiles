import Gtk from 'gi://Gtk';

class Icon extends Gtk.Box {
    static {
        Widget.register(this, {
            properties: {
                'count': ['int', 'rw']
            }
        })
    }
}