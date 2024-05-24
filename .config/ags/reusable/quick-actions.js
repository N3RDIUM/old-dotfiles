const QuickActions = (
    actions, 
    css = '', 
    action_css = ''
) => Widget.Box({
    css: css,
    children: actions.map(x => {
        return Widget.Button({
            on_clicked: x.action,
            child: Widget.Label({
                label: x.icon,
                css: action_css
            })
        })
    })
})
export default QuickActions;