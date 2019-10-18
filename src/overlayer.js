'use strict'
let ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
let ffmpeg = require('fluent-ffmpeg');
let command = ffmpeg();

export default class Overlayer {
    constructor(vid, img, wPos, hPos, bTime, eTime) {
        this.video = vid;
        this.image = img;
        this.widthPosition = wPos;
        this.heightPosition = hPos;
        this.beginTime = bTime;
        this.endTime = eTime;
        ffmpeg.setFfmpegPath(ffmpegPath);
        var command = new ffmpeg();


    }

    executeCommand() {
        ffmpeg(this.video)
            .input(this.image)
            .complexFilter([
                `overlay=${this.widthPosition}:${this.heightPosition}:enable='between(t,${this.beginTime},${this.endTime})'`
            ])
            .on('start', function (commandLine) {
                console.log("Spawned ffmpeg with command: " + commandLine);
            })
            .on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '% done');
            })
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
            })
            .on('end', function () {
                console.log('Processing finished !');
            })
            .save(`${process.cwd()}/Overlayed2.mp4`);
    }



}