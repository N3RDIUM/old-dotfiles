const hyprland = await Service.import('hyprland');
const applications = await Service.import('applications');

function getClientInfo(client, replacements) {
    for (const app of applications.list) {
        let cls = client.class;

        if(cls in replacements) {
            cls = replacements[cls];
        }

        if (client.title && app.match(client.title) ||
            client.class && app.match(cls)
        ) {
            return app
        }
    }
    return null;
}

const ActiveIcon = (css, replacements, default_icon) => Widget.Icon({
    icon: hyprland.active.bind('client').as(x => getClientInfo(x, replacements)?.icon_name || default_icon),
    css: css
})

export default ActiveIcon;
