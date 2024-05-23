const hyprland = await Service.import('hyprland');

function limitString(string, n) {
    if (n < 0) return string;
    if (!string || string.length <= n) return string;
    return `${string.substring(0, n - 3)}...`;
}

// Pretty straightforward
const WindowTitle = (limit = 48) => Widget.Label({
    class_names: ['label'],
    label: hyprland.bind('active').as(x => limitString(x.client.title, limit))
})

export default WindowTitle;
