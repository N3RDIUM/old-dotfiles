const powerProfiles = await Service.import('powerprofiles');

const PowerProfiles = (icons, icon_css = "", label_css = "") => Widget.Button({
    child: Widget.Box({
        children: [
            Widget.Label({
                label: powerProfiles.bind('active_profile').as(x => icons[x]),
                css: icon_css
            }),
            Widget.Label({
                label: powerProfiles.bind('active_profile'),
                css: label_css
            })
        ]
    }),
    on_clicked: () => {
        switch (powerProfiles.active_profile) {
            case 'balanced':
                powerProfiles.active_profile = 'performance';
                break;
            case 'power-saver':
                powerProfiles.active_profile = 'balanced';
                break;
            default:
                powerProfiles.active_profile = 'power-saver';
                break;
        }
    }
})

export default PowerProfiles;
