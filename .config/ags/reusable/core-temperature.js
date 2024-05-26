const temp = Variable("0", {
    poll: [100, 'python -c \'import psutil; print(psutil.sensors_temperatures()["coretemp"][0].current)\'', out => Number(out).toFixed(0).toString()]
})

const CoreTemp = () => Widget.Label({
    label: temp.bind().as(x => "CORE " + x + "°C"),
    css: temp.bind().as(x => {
        let n = Number(x);
        if (n > 80) return 'font-size: 12px; font-family: FiraCode; color: red;'
        if (n > 75) return 'font-size: 12px; font-family: FiraCode; color: orange;'
        if (n > 70) return 'font-size: 12px; font-family: FiraCode; color: yellow;'
        return 'font-size: 12px; font-family: FiraCode;';
    })
})

export default CoreTemp;
