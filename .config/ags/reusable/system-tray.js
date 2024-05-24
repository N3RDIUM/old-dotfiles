const systemtray = await Service.import('systemtray')

/** @param {import('types/service/systemtray').TrayItem} item */
const SysTrayItem = (item, css) => Widget.Button({
    child: Widget.Icon({
        css: css
    }).bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

const SystemTray = (css, icon_css) => Widget.Box({
    css: css,
    children: systemtray.bind('items').as(i => i.map((i) => SysTrayItem(i, icon_css)))
})

export default SystemTray;