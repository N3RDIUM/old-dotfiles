const disk = Variable(0, {
    poll: [60000, 'python -c \'import os; statvfs = os.statvfs("/home/n3rdium"); print(int(statvfs.f_frsize * statvfs.f_bfree / 1000000000))\'', out => out]
})

const DiskSpace = () => Widget.Label({
    label: disk.bind().as(x => "DISK " + x + " GB"),
    css: 'font-size: 12px;'
})

export default DiskSpace;
