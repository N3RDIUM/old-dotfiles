import "./Bar.css"
import { App, Astal, Gtk, bind } from "astal"
import { date } from "../lib"

function LeftBar() {
    return <box>
        <box className={"semi-box-bottom"}>
            <label label="Menu"/>
        </box>
        <box className={"semi-box-bottom"}>
            <label label="Something"/>
        </box>
        <box hexpand={true}></box>
    </box>
}

function CenterBar() {
    return <box>
        <box className={"semi-box-bottom"}>
            <label label="Doooooooooooooooooooooooooooooooock"/>
        </box>
    </box>
}

function RightBar() {
    return <box halign={Gtk.Align.END}>
        <box className={"semi-box-bottom"}>
            <label label="Sysmon"/>
        </box>
        <box className={"semi-box-bottom-end"}>
            <label label="Systray"/>
        </box>
    </box>
}

export default function TopBar() {
    return <window
        className={"bottom-bar"}
        name={`BottomBar`}
        application={App}
        anchor={Astal.WindowAnchor.BOTTOM
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}>
        <centerbox>
            <LeftBar />
            <CenterBar />
            <RightBar />
        </centerbox>
    </window>
}
