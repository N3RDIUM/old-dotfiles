import "./Bar.css"
import { App, Astal, Gtk, bind } from "astal"
import { date } from "../lib"

function LeftBar() {
    return <box>
        <box className={"semi-box-top"}>
            <label label="Workspaces"/>
        </box>
        <box className={"semi-box-top"}>
            <label label="Something"/>
        </box>
        <box hexpand={true}></box>
    </box>
}

function CenterBar() {
    return <box>
        <box className={"semi-box-top"}>
            <label label="Icon"/>
        </box>
        <box className={"semi-box-top"}>
            <label label="Current Window"/>
        </box>
        <box className={"semi-box-top"}>
            <label label="Window Quick Actions"/>
        </box>
    </box>
}

function RightBar() {
    return <box halign={Gtk.Align.END}>
        <box className={"semi-box-top"}>
            <label label="Astro" />
        </box>
        <box className={"semi-box-top"}>
            <label label={bind(date)} />
        </box>
        <box className={"semi-box-top-end"}>
            <label label="Quick Actions"/>
        </box>
    </box>
}

export default function TopBar() {
    return <window
        className={"top-bar"}
        name={`TopBar`}
        application={App}
        anchor={Astal.WindowAnchor.TOP
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
