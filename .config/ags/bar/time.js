const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
var wkday = Variable('', {
    poll: [1000, 'date +"%w"', idx => days[Number(idx)]]
})

function removePrefix(string) {
    if(string[0] == '0') {
        string = string.substring(1)
    }
    return string
}
var date = Variable('', {
    poll: [1000, 'date +"%d/%m/%y"', out => removePrefix(out.toString().replace('/0', '/'))]
})

var time = Variable('', {
    poll: [1000, 'date +"%H:%M"']
})

const Time = () => Widget.CenterBox({ // Just the date/time and weather
    vertical: false,
    homogeneous: false,
    css: "background: rgba(100, 100, 100, 0.64); min-height: 28px; padding-left: 8px; padding-right: 8px; border-radius: 8px; margin-top: 4px; border: solid 1px rgba(200, 200, 200, 0.42);",
    center_widget: Widget.Box({
        children: [
            Widget.Label({
                label: wkday.bind(),
                css: 'color: white; font-family: FiraCode; font-size: 12px; margin-right: 4px'
            }),
            Widget.Label({
                label: date.bind(),
                css: 'color: white; font-family: FiraCode; font-size: 12px; margin-right: 4px'
            }),
            Widget.Label({
                label: time.bind(),
                css: 'color: white; font-family: FiraCode; font-size: 12px;'
            }),
        ],
    })
})

export default Time;