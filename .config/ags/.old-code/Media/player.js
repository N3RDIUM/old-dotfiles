const audio = await Service.import('audio');
const mpris = await Service.import('mpris');
import delay from '../delay.js';
import Gtk from 'gi://Gtk';
const players = mpris.bind("players");

class Player extends Gtk.Box {
    static {
        Widget.register(this, {
            properties: {
                'coverart': ['string', 'rw'],
                'title': ['string', 'rw'],
                'progress': ['float', 'rw'],
                'playeridx': ['int', 'rw'],
            }
        })
    }

    constructor(props) {
        super(props);
        this.pidx = Variable(0)

        this.iconWidget = Widget.Icon({
            icon: this.coverart,
            css: 'font-size: 88px; margin: 8px; border-radius: 10px;'
        }),
        this.add(this.iconWidget)

        this.titleLabel = Widget.Label({
            label: this.title,
            css: 'font-size: 16px; padding: 4px; color: #ffffff;'
        })

        const previousUnmutedVolume = Variable(0)
        this.volumeWidget = Widget.CircularProgress({
            css: 'font-size: 2px;'
                + 'background-color: transparent;'
                + 'color: white;'
                + 'min-width: 32px;'
                + 'min-height: 32px;',
            rounded: false,
            inverted: false,
            startAt: 0.75,
            value: audio['speaker'].bind('volume'),
            child: Widget.Button({
                child: Widget.Icon({
                css: 'font-size: 16px; color: white;'
                }).hook(audio.speaker, self => {
                    const vol = audio.speaker.volume * 100;
                    const icon = [
                        [101, 'overamplified'],
                        [67, 'high'],
                        [34, 'medium'],
                        [1, 'low'],
                        [0, 'muted'],
                    ].find(([threshold]) => threshold <= vol)?.[1];

                    if(vol != 0) {
                        previousUnmutedVolume.setValue(vol)
                    }
            
                    self.icon = `audio-volume-${icon}-symbolic`;
                    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
                }),
                on_clicked: async self => {
                    let icon = self.get_child()
                    icon.css = 'font-size: 16px; min-width: 16px; min-height: 24px; animation: shrink-once16 0.256s ease-in-out;';
                    await delay(256)
                    icon.css = 'font-size: 16px; min-width: 16px; min-height: 24px;';

                    let vol = audio.speaker.volume * 100;
                    if(vol != 0) {
                        audio.speaker.volume = 0
                    } else {
                        audio.speaker.volume = previousUnmutedVolume.getValue() / 100
                    }
                },
                setup: self => {
                    Utils.monitorFile('/home/n3rdium/.config/ags/mute_key', async () => {
                        let icon = self.get_child()
                        icon.css = 'font-size: 16px; min-width: 16px; min-height: 24px; animation: shrink-once16 0.256s ease-in-out;';
                        await delay(256)
                        icon.css = 'font-size: 16px; min-width: 16px; min-height: 24px;';

                        let vol = audio.speaker.volume * 100;
                        if(vol != 0) {
                            audio.speaker.volume = 0
                        } else {
                            audio.speaker.volume = previousUnmutedVolume.getValue() / 100
                        }
                    })
                }
            })
        })

        this.pausePlay = Widget.Button({
            child: Widget.Icon({
                css: 'font-size: 24px; min-width: 24px; min-height: 24px;',
                icon: '/home/n3rdium/.config/ags/Media/icons/play.svg',
                setup: self => {
                    mpris.connect('changed', async () => {
                        let icon = self
                        icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                        await delay(256)
                        icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';

                        let status = mpris.players[this.pidx.getValue()].play_back_status
                        if(status == "Playing") {
                            self.icon = '/home/n3rdium/.config/ags/Media/icons/play.svg'
                        } else if (status == "Paused") {
                            self.icon = '/home/n3rdium/.config/ags/Media/icons/pause.svg'
                        } else {
                            self.icon = '/home/n3rdium/.config/ags/Media/icons/play.svg'
                        }
                    })
                }
            }),
            onClicked: async self => {
                if(mpris.players[this.pidx.getValue()].can_play) {
                    mpris.players[this.pidx.getValue()].playPause()
                }
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        })
        
        this.prev = Widget.Button({
            child: Widget.Icon({
                css: 'font-size: 24px;',
                icon: '/home/n3rdium/.config/ags/Media/icons/previous.svg'
            }),
            onClicked: async self => {
                if(mpris.players[this.pidx.getValue()].can_go_next) {
                    mpris.players[this.pidx.getValue()].next()
                }
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        })
        this.next = Widget.Button({
            child: Widget.Icon({
                css: 'font-size: 24px;',
                icon: '/home/n3rdium/.config/ags/Media/icons/next.svg'
            }),
            onClicked: async self => {
                if(mpris.players[this.pidx.getValue()].can_go_prev) {
                    mpris.players[this.pidx.getValue()].previous()
                }
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        })
        this.playerSwitch = Widget.Button({
            child: Widget.Icon({
                css: 'font-size: 24px;',
                icon: '/home/n3rdium/.config/ags/Media/icons/disc.svg'
            }),
            onClicked: async self => {
                if(mpris.players[this.pidx.getValue() + 1]) {
                    this.pidx.setValue(this.pidx.getValue() + 1)
                } else {
                    this.pidx.setValue(0)
                }
                let icon = self.get_child()
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px; animation: shrink-once 0.256s ease-in-out;';
                await delay(256)
                icon.css = 'font-size: 24px; padding-left: 2px; padding-right: 2px; min-width: 24px; min-height: 24px;';
            }
        })

        this.playbackControlsWrapper = Widget.CenterBox({
            vertical: false,
            homogeneous: false,
            css: 'padding: 8px; min-width: 172px;',
            startWidget: this.prev,
            centerWidget: this.pausePlay,
            endWidget: this.next
        })

        this.controlsWrapper = Widget.CenterBox({
            vertical: false,
            homogeneous: false,
            css: 'margin-top: 16px; min-width: 172px;',
            startWidget: this.volumeWidget,
            centerWidget: this.playbackControlsWrapper,
            endWidget: this.playerSwitch,
        })

        this.rightPaneWrapper = Widget.Box({
            vertical: true,
            homogeneous: false,
            css: 'padding: 8px; min-width: 256px;',
            children: [
                this.titleLabel,
                // this.musicProgress,
                this.controlsWrapper
            ]
        })
        this.add(this.rightPaneWrapper);
    }

    get coverart() {
        return this._coverart;
    }
    set coverart(coverart) {
        this.iconWidget.icon = coverart;
        this._coverart = coverart;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
        this.titleLabel.label = title;
    }

    get playeridx() {
        return this._playeridx;
    }
    set playeridx(playeridx) {
        this._playeridx = playeridx
        this.pidx.setValue(playeridx)
    }
}

export default Player;