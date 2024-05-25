const time = Variable("", {
    poll: [1000, 'date +"%H:%M"'],
})

const Clock = (css = '') => Widget.Label({
    label: time.bind(),
    css: css
})

export default Clock;