const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var wkday = Variable('', {
    poll: [1000, 'date +"%w"', idx => days[Number(idx)]]
})

var date = Variable('', {
    poll: [1000, 'date +"%d/%m/%y"']
})

var time = Variable('', {
    poll: [1000, 'date +"%H:%M"']
})

const Time = () => Widget.CenterBox({ // Just the date/time and weather
    vertical: false,
    homogeneous: false,
    css: "background: rgba(64, 64, 64, 0.6); min-height: 40px; padding-left: 8px; padding-right: 8px; border-radius: 4px; margin-top: 4px;",
    center_widget: Widget.Box({
        children: [
            Widget.Label({
                label: wkday.bind(),
                css: 'color: white; font-family: FiraCode; font-size: 14px; margin-right: 4px'
            }),
            Widget.Label({
                label: date.bind(),
                css: 'color: white; font-family: FiraCode; font-size: 14px; margin-right: 4px'
            }),
            Widget.Label({
                label: time.bind(),
                css: 'color: white; font-family: FiraCode; font-size: 14px;'
            }),
        ],
    })
})

export default Time;