const divide = ([total, free]) => free / total

const ram = Variable(0, {
    // @ts-ignore
    poll: [1000, 'free', out => divide(out.split('\n')
        .find(line => line.includes('Mem:'))
        .split(/\s+/)
        .splice(1, 2))],
})

// TODO! Add customizability!
const RAMMonitor = () => Widget.CircularProgress({
    css: 'min-width: 32px;'
        + 'min-height: 32px;'
        + 'font-size: 3px;'
        + 'background-color: rgba(255, 255, 255, 0.24);'
        + 'color: white;',
    rounded: true,
    startAt: 0.75,
    value: ram.bind().as(p => p),
    child: Widget.Label({
        label: '󰍛',
        css: ram.bind().as(x => {
            let n = Number(x)
            if (n > 0.5) return 'font-size: 18px; font-family: FiraCode; color: yellow;';
            if (n > 0.8) return 'font-size: 18px; font-family: FiraCode; color: red;';
            return 'font-size: 18px; font-family: FiraCode;';
        })
    })
})

export default RAMMonitor;
