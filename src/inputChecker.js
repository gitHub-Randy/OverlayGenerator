'use strict'
const fs = require('fs')
const path = require('path');
const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');

let ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
let ffmpeg = require('fluent-ffmpeg');
let command = ffmpeg();


export default class InputChecker {
    constructor(vid, img, wPos, hPos, bTime, eTime) {
        this.video = vid;
        this.image = img;
        this.widthPosition = wPos;
        this.heightPosition = hPos;
        this.beginTime = bTime;
        this.endTime = eTime;
        ffmpeg.setFfmpegPath(ffmpegPath);

    }

    //checks if the given input is processible and not valid 
    async checkInput() {
        try {
            const videoInfo = await this.getMediaInformation(this.video);
            let inputIsValid = false;
            inputIsValid = this.ExtensionIsValid(this.video, ['.mp4']);
            inputIsValid = this.ExtensionIsValid(this.image, ['.png']);
            inputIsValid = this.positionIsValid(videoInfo, this.widthPosition, this.heightPosition)
            inputIsValid = this.TimeParamsValid(videoInfo.streams[0].duration, this.beginTime, this.endTime)
            return inputIsValid;
        } catch (error) {
            console.log("ERROR: INPUTCHECKER.checkInput() -  Not processible input given")
            throw new Error(error);
        }
    }

    // checks if file exist and get the media information of it and returns it
    async getMediaInformation(mediaPath) {
        try {
            if (await this.fileExist(mediaPath)) {
                let info = await this.probeMedia(mediaPath);
                return info;
            }
        } catch (error) {
            throw new Error(`ERROR: getMediaInformation() - could not get informotaton of input media ${mediaPath}`);
        }
    }

    // gets media information for example : width, height duration etc. from a video
    async probeMedia(mediaFile) {
        return new Promise(resolve => {
            try {
                ffprobe(mediaFile, { path: ffprobeStatic.path }, function (err, info) {
                    resolve(info)
                });
            } catch (e) {
                throw new Error(e);
            }


        })

    }

// checks if a given file exists
    async fileExist(file) {
        return new Promise(resolve => {
            fs.access(file, fs.F_OK, (err) => {
                try {
                    resolve(true)
                } catch (err) {
                    throw new Error(err);

                }
            })
        })


    }

    // checks if the file has the right extension extension(.mp4.avi etc.) 
    ExtensionIsValid(mediaFile, extensions) {
        let extension = path.extname(mediaFile);
        let acceptableVideoFileExtensions = extensions
        for (let i = 0; i < acceptableVideoFileExtensions.length; i++) {
            if (extension == acceptableVideoFileExtensions[i]) {
                return true;
            }
        }
        return false;

    }
    // checks if the input position of the file that will be overlayed on the video is not out of bounds 
    positionIsValid(mediaInfo, xPosition, yposition) {
        var vidWidth;
        let vidHeight;
        vidWidth = mediaInfo.streams[0].width;
        vidHeight = mediaInfo.streams[0].height;
        if (xPosition > vidWidth || yposition > vidHeight) {
            console.log(`starting position of overlay may not be out of bounds:`)
            console.log(` Video width: ${vidWidth} Video height: ${vidHeight} xPosition: ${xPosition} yPosition: ${yposition}`);
            return false;
        }
        return true;
    }


    // checks if the time params where the overlay should be visible are not out of bounds (before the video starts or after the video ends)
    TimeParamsValid(videLenght, beginTime, endTime) {
        // compares videoFile length with the time param and returns true when the param is not longer than the videoLenght
        if (videLenght >= endTime && beginTime >= 0) {
            return true;
        }
        console.log("TIME PARAMS ARE WRONG");
        return false;
    }
}