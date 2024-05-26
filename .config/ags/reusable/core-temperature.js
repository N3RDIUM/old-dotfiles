const temp = Variable("0", {
    poll: [100, 'python -c \'import psutil; print(psutil.sensors_temperatures()["coretemp"][0].current)\'', out => Number(out).toFixed(0).toString()]
})

const CoreTemp = () => Widget.Label({
    label: temp.bind().as(x => "CORE " + x + "°C"),
    css: 'font-size: 12px;'
})

export default CoreTemp;
