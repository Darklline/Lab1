interface SoundData {
    key: string;
    time: number;
}
interface ChannelsContainer {
    [key: string]: SoundData[];
}

class SoundPlayer {
    private audioElements!: HTMLAudioElement[];
    private dataChannels!: HTMLDivElement[];
    private channelContainer: ChannelsContainer;
    private activeChannels: Set<string>;
    constructor() {
        this.getElements();
        this.addEventListeners();
        this.activeChannels = new Set();
        this.channelContainer = this.dataChannels.reduce(
            (acc, { dataset }) => ({ ...acc, [dataset.channel as string]: [] }),
            {},
        );
    }

    getElements() {
        this.audioElements = [...document.querySelectorAll('audio')];
        this.dataChannels = [...document.querySelectorAll('[data-channel]')] as HTMLDivElement[];
    }

    addEventListeners() {
        window.addEventListener('keydown', e => this.handleKeyEvent(e));

        this.dataChannels.forEach(el =>
            el.addEventListener('click', e => this.handleChannelClick(e)),
        );
    }

    handleKeyEvent(e: KeyboardEvent) {
        const { key, timeStamp: time } = e;

        if (this.activeChannels.size) {
            this.activeChannels.forEach(channelId => {
                this.channelContainer[channelId] = [
                    ...this.channelContainer[channelId],
                    { key, time },
                ];
            });
        }

        this.playSound(key);
    }

    playSound(key: string) {
        const audio = this.audioElements.find(({ dataset }) => dataset.soundKey === key);

        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    }

    handleChannelClick(e: Event) {
        const { dataset: parentDataset } = e.currentTarget as HTMLDivElement;
        const button = e.target as HTMLButtonElement;

        if (button.className.includes('play')) {
            this.playChannel(parentDataset.channel);
            return;
        }

        this.setActiveChannel(parentDataset.channel);
    }

    playChannel(channelId?: string) {
        if (!channelId) return;

        this.channelContainer[channelId].forEach(({ key, time }) =>
            setTimeout(() => this.playSound(key), time),
        );
    }

    setActiveChannel(channelId?: string) {
        if (!channelId) return;

        if (this.isChannelActive(channelId)) return;

        this.activeChannels.add(channelId);
        this.changeRecordButtonText(channelId, 'Stop');
    }

    changeRecordButtonText(channelId: string, text: string) {
        const recordButton = (this.dataChannels.find(
            ({ dataset }) => dataset.channel === channelId,
        ) as HTMLDivElement).firstElementChild as HTMLButtonElement;

        recordButton.textContent = text;
    }

    isChannelActive(channelId: string) {
        const isActive = this.activeChannels.has(channelId);

        if (isActive) {
            this.activeChannels.delete(channelId);
            this.changeRecordButtonText(channelId, 'Record');

            return true;
        }

        return false;
    }
}

const sp = new SoundPlayer();
