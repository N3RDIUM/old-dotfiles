const hyprland = await Service.import('hyprland');
const { Gio } = imports.gi;
import config from '../config_loader.js';
const iconAliases = config['dock']['icon-aliases'];

var execIcons = {};
function rebuildIcons() {
    let icons = Gio.AppInfo.get_all();
    for (let icon of icons) {
        let basename = Utils.exec('basename '+ icon.get_executable());
        let _icon = icon.get_icon();
        if(_icon) {
            if('names' in _icon) {
                execIcons[basename] = _icon.names[0]
            }
        }
    }
}
rebuildIcons();

class WindowDiffService extends Service {
    static {
        Service.register(
            this,
            {
                'opened': ['jsobject'],
                'closed': ['jsobject'],
            }
        );
    }

    constructor() {
        super();

        this.clients = [];
        this.window_details = {};
        hyprland.connect('changed', () => {
            this.updateWindowDetails();
        })
    }

    updateWindowDetails(){
        var clients = hyprland.clients;
        var clientPIDs = [];
        for(let client of clients){
            if(client.workspace.id == hyprland.active.workspace.id) {
                clientPIDs.push(client.pid);
            }
            if(!(client.pid in this.window_details)) {
                this.window_details[client.pid] = {
                    'class': client.initialClass,
                    'icon': this.class2Icon(client.pid, client.initialClass)
                }
            }
        }
        
        let diff = this.arrayDiff(this.clients, clientPIDs);
        
        for(let pid of diff.negative) {
            this.emit('closed', {
                pid: pid,
                details: this.window_details[pid]
            })
        } 
        for (let pid of diff.positive) {
            this.emit('opened', {
                pid: pid,
                details: this.window_details[pid]
            })
        }

        this.clients = clientPIDs;
    }

    class2Icon(pid, window_class) {
        rebuildIcons();
        let executable = Utils.exec('readlink -f /proc/' + pid.toString() + '/exe')
        let basename = Utils.exec('basename '+ executable);
        let icon = execIcons[basename]
        if (icon) {
            return this.iconAlias(window_class, icon)
        }
    }
    
    iconAlias(window_class, icon) {
        if (window_class in iconAliases) {
            return iconAliases[icon]
        }
        return icon
    }

    arrayDiff(previous, current) {
        return {
            negative: previous.filter(x => !current.includes(x)),
            positive: current.filter(x => !previous.includes(x))
        }
    }
}

const service = new WindowDiffService;
export default service;