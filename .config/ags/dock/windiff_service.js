const hyprland = await Service.import('hyprland');

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
            if(!(client.pid in this.window_details)) {
                this.window_details[client.pid] = client;
            }
            if(client.workspace.id == hyprland.active.workspace.id) {
                clientPIDs.push(client.pid);
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

    arrayDiff(previous, current) {
        return {
            negative: previous.filter(x => !current.includes(x)),
            positive: current.filter(x => !previous.includes(x))
        }
    }
}

const service = new WindowDiffService;
export default service;