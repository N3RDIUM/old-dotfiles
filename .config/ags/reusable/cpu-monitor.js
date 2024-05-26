const divide = ([total, free]) => free / total

const cpu = Variable(0, {
    // @ts-ignore
    poll: [1000, 'top -b -n 1', out => divide([100, out.split('\n')
        .find(line => line.includes('Cpu(s)'))
        .split(/\s+/)[1]
        .replace(',', '.')])],
})

// TODO! Add customizability!
const CPUMonitor = () => Widget.CircularProgress({
    css: 'min-width: 32px;'
        + 'min-height: 32px;'
        + 'font-size: 3px;'
        + 'background-color: rgba(255, 255, 255, 0.24);'
        + 'color: white;',
    rounded: true,
    startAt: 0.75,
    value: cpu.bind().as(p => p),
    child: Widget.Label({
        label:'C',
        css: 'font-size: 16px;'
    })
})

export default CPUMonitor;
