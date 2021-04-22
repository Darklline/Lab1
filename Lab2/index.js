var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
        this.getElements();
        this.addEventListeners();
        this.activeChannels = new Set();
        this.channelContainer = this.dataChannels.reduce(function (acc, _a) {
            var _b;
            var dataset = _a.dataset;
            return (__assign(__assign({}, acc), (_b = {}, _b[dataset.channel] = [], _b)));
        }, {});
    }
    SoundPlayer.prototype.getElements = function () {
        this.audioElements = __spreadArrays(document.querySelectorAll('audio'));
        this.dataChannels = __spreadArrays(document.querySelectorAll('[data-channel]'));
    };
    SoundPlayer.prototype.addEventListeners = function () {
        var _this = this;
        window.addEventListener('keydown', function (e) { return _this.handleKeyEvent(e); });
        this.dataChannels.forEach(function (el) {
            return el.addEventListener('click', function (e) { return _this.handleChannelClick(e); });
        });
    };
    SoundPlayer.prototype.handleKeyEvent = function (e) {
        var _this = this;
        var key = e.key, time = e.timeStamp;
        if (this.activeChannels.size) {
            this.activeChannels.forEach(function (channelId) {
                _this.channelContainer[channelId] = __spreadArrays(_this.channelContainer[channelId], [
                    { key: key, time: time },
                ]);
            });
        }
        this.playSound(key);
    };
    SoundPlayer.prototype.playSound = function (key) {
        var audio = this.audioElements.find(function (_a) {
            var dataset = _a.dataset;
            return dataset.soundKey === key;
        });
        if (!audio)
            return;
        audio.currentTime = 0;
        audio.play();
    };
    SoundPlayer.prototype.handleChannelClick = function (e) {
        var parentDataset = e.currentTarget.dataset;
        var button = e.target;
        if (button.className.includes('play')) {
            this.playChannel(parentDataset.channel);
            return;
        }
        this.setActiveChannel(parentDataset.channel);
    };
    SoundPlayer.prototype.playChannel = function (channelId) {
        var _this = this;
        if (!channelId)
            return;
        this.channelContainer[channelId].forEach(function (_a) {
            var key = _a.key, time = _a.time;
            return setTimeout(function () { return _this.playSound(key); }, time);
        });
    };
    SoundPlayer.prototype.setActiveChannel = function (channelId) {
        if (!channelId)
            return;
        if (this.isChannelActive(channelId))
            return;
        this.activeChannels.add(channelId);
        this.changeRecordButtonText(channelId, 'Stop');
    };
    SoundPlayer.prototype.changeRecordButtonText = function (channelId, text) {
        var recordButton = this.dataChannels.find(function (_a) {
            var dataset = _a.dataset;
            return dataset.channel === channelId;
        }).firstElementChild;
        recordButton.textContent = text;
    };
    SoundPlayer.prototype.isChannelActive = function (channelId) {
        var isActive = this.activeChannels.has(channelId);
        if (isActive) {
            this.activeChannels["delete"](channelId);
            this.changeRecordButtonText(channelId, 'Record');
            return true;
        }
        return false;
    };
    return SoundPlayer;
}());
var sp = new SoundPlayer();
