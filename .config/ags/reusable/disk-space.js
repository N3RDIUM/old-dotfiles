const disk = Variable(0, {
    poll: [60000, 'python -c \'import os; statvfs = os.statvfs("/home/n3rdium"); print(int(statvfs.f_frsize * statvfs.f_bfree / 1000000000))\'', out => out]
})

const DiskSpace = () => Widget.Label({
    label: disk.bind().as(x => "DISK " + x + " GB"),
    css: disk.bind().as(x => {
        let n = Number(x);
        if (n < 10) return 'font-size: 12px; font-family: FiraCode; color: red;';
        if (n < 50) return 'font-size: 12px; font-family: FiraCode; color: orange;';
        if (n < 100) return 'font-size: 12px; font-family: FiraCode; color: yellow;';
        return 'font-size: 12px; font-family: FiraCode;';
    })
})

export default DiskSpace;
