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
        + 'background-color: #4c566a;'
        + 'color: #d8dee9;',
    rounded: true,
    startAt: 0.75,
    value: cpu.bind().as(p => p),
    child: Widget.Label({
        label:'󰻠',
        css: cpu.bind().as(x => {
            let n = Number(x)
            if (n > 0.5) return 'font-size: 18px; font-family: FiraCode; color: #ebcb8b;'
            if (n > 0.8) return 'font-size: 18px; font-family: FiraCode; color: #bf616a;'
            return 'font-size: 18px; font-family: FiraCode;';
        })
    })
})

export default CPUMonitor;
