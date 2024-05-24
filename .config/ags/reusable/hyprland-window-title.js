const hyprland = await Service.import('hyprland');

function limitString(string, n, placeholder) {
    if (string == '') return placeholder;
    if (n < 0) return string;
    if (!string || string.length <= n) return string;
    return `${string.substring(0, n - 3)}...`;
}

// Pretty straightforward
const WindowTitle = (css, placeholder, limit = 48) => Widget.Label({
    css: css,
    class_names: ['label'],
    label: hyprland.bind('active').as(x => limitString(x.client.title, limit, placeholder))
})

export default WindowTitle;
