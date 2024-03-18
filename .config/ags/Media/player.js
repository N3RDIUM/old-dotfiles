const audio = await Service.import('audio')
import Gtk from 'gi://Gtk';

class Player extends Gtk.Box {
    static {
        Widget.register(this, {
            properties: {
                'coverart': ['string', 'rw'],
                'title': ['string', 'rw'],
                'progress': ['float', 'rw'],
            }
        })
    }

    constructor(props) {
        super(props);

        this.iconWidget = Widget.Icon({
            icon: this.coverart,
            css: 'font-size: 88px; margin: 8px; border-radius: 10px;'
        }),
        this.add(this.iconWidget)

        this.titleLabel = Widget.Label({
            label: this.title,
            css: 'font-size: 16px; padding: 4px; color: #ffffff;'
        })
        this.musicProgress = Widget.ProgressBar({ 
            value: 0,
            css: 'margin-top: 4px; margin-bottom: 4px;'
        })
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
        
                self.icon = `audio-volume-${icon}-symbolic`;
                self.tooltip_text = `Volume ${Math.floor(vol)}%`;
            }),
        })

        this.controlsWrapper = Widget.Box({
            vertical: false,
            homogeneous: false,
            css: 'margin-top: 8px; min-width: 172px;',
            children: [
                this.volumeWidget
            ]
        })

        this.rightPaneWrapper = Widget.Box({
            vertical: true,
            homogeneous: false,
            css: 'padding: 8px; min-width: 256px;',
            children: [
                this.titleLabel,
                this.musicProgress,
                this.controlsWrapper
            ]
        })
        this.add(this.rightPaneWrapper)
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

    get progress() {
        return this._progress;
    }
    set progress(progress) {
        this._progress = progress;
        this.musicProgress.value = progress;
    }
}

export default Player;