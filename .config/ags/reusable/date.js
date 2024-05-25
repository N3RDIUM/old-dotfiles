const day = Variable("", {
    poll: [10000, 'date +"%A"'],
})
const date = Variable("", {
    poll: [10000, 'date +"%d/%m/%y"'],
})

const DateWidget = (css = '', wd_css = '', d_css = '') => Widget.Button({
    child: Widget.Box({
        vertical: true,
        children: [
            Widget.Label({
                label: day.bind(),
                css: wd_css
            }),
            Widget.Label({
                label: date.bind(),
                css: d_css
            })
        ]
    }),
    css: css,
    on_clicked: () => {
        console.log('TODO: Calendar Widget w/ reminders and shtuff')
    }
})

export default DateWidget;