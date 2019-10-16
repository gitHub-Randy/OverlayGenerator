'use strict'
const fs = require('fs')
const path = require('path');
const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');

var ffmpeg = require('ffmpeg');


export default class InputChecker {
    constructor() {

    }

    checkInput() {

    }
    // input should be Overlayer <videoFile> <imageFile> <WidthXHeight> <startTime-EndTime>
    getArguments() {
        return process.argv;
    }


    fileExist(file) {

        fs.access(file, fs.F_OK, (err) => {
            if (err) {
                console.error(`The File ${file} does not exist`);
                throw new Error(err);
            } else {
                return true;
            }
        })
    }

    //TODO: list of accepted file extensions?as parameter?
    videoExtensionIsValid(mediaFile, extensions) {
        // checks if the file extension is indeed a videoFile and returns true or throws an error
        let extension = path.extname(accepted);
        let acceptableVideoFileExtensions = extensions
        acceptableVideoFileExtensions.forEach(element => {
            if (extension == element) {
                return true;
            }
        });
        throw new Error(`The Video file ${videoFile} is currently not supported`);

    }
    //use ffprobe
    async positionIsValid(videoFile, imageFile, xPosition, yposition) {
        var vidWidth;
        let vidHeight;
        let vidDuration;
        await ffprobe(videoFile, { path: ffprobeStatic.path })
            .then(function (info) {

                vidWidth = info.streams[0].width;
                vidHeight = info.streams[0].height;

                vidDuration = info.streams[0].duration;

            })
            .catch(function (err) {
                console.error(err);
            })

        console.log(`${vidWidth} ${vidHeight} ${vidDuration}`)



        var imgWidth;
        let imgHeight;
        await ffprobe(imageFile, { path: ffprobeStatic.path })
            .then(function (info) {

                imgWidth = info.streams[0].width;
                imgHeight = info.streams[0].height;
            })
            .catch(function (err) {
                console.error(err);
            })

        console.log(`${imgWidth} ${imgHeight}`)
            let newImage;
            // resize width smaller
            if(vidWidth< imgWidth){
                newImage = await this.resizer(imageFile, vidWidth/20);
            }

            if(vidHeight< imgHeight){
                newImage = await this.resizer(imageFile,undefined, vidHeight/20);
            }
            let newimgWidth;
            let newimgHeight;
            await ffprobe(newImage, { path: ffprobeStatic.path })
            .then(function (info) {

                newimgWidth = info.streams[0].width;
                 newimgHeight = info.streams[0].height;
            })
            .catch(function (err) {
                console.error(err);
            })

        console.log(`${newimgWidth} ${newimgHeight}`)


            //resize height smaller


        // nicht -0
        //W+wOverlay darf nicht > sein als wUnderlay
        //H+hOverlay darf nicht > sein als hUnderlay

        // w !< -0
        // h !< -0

        // w+wOverlay !> w underlay
        // h+hOverlay !> h underlay
        //not -0
        //not W+wOL > wUL
        //
        // compares if the videoFile size and imageFile size is compatible(image file size may not be bigger than the video Size) 
        let videoSize = ''//TODO FFPROBE
        let imageSize = ''//TODO FFPROBE

        //check if image is bigger than video
        // if true throw error





    }


    async resizer(movie, width, height) {
        console.log(`yeeet: ${movie}`)
        let w;
        let h;
        try {
            if(width == undefined){
                w = '?';
            }
            if(height == undefined){
                h = '?';
            }
            var process = new ffmpeg(movie);
            process.then(function (image) {
                
                image
                .setVideoSize(`${w}x${h}`, true, true,)
                .save(`resizedVid_${w}x${h}.mp4`, function (error, file) {
                    if (!error)
                        console.log('Video file: ' + file);
                        return file;
                });
        
            }, function (err) {
                console.log('Error: ' + err);
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
    }

    TimeParamsValid() {
        // compares videoFile length with the time param and returns true when the param is not longer than the videoLenght
    }



}