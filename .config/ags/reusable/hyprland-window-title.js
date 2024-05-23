const hyprland = await Service.import('hyprland');

// Pretty straightforward
const WindowTitle = () => Widget.Label({
    class_names: ['label'],
    label: hyprland.bind('active').as(x => x.client.title)
})

export default WindowTitle;
