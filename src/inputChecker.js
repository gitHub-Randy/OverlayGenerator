'use strict'
const fs = require('fs')
const path = require('path');


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

        fs.access(file, fs.F_OK, (err)=>{
            if(err){
                console.error(`The File ${file} does not exist`);
                throw new Error(err);
            }else{
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
            if(extension == element){
                return true;
            }
        });
        throw new Error(`The Video file ${videoFile} is currently not supported`); 

    }
    //use ffprobe
    positionIsValid(videoFile, imageFile, positon){
        // compares if the videoFile size and imageFile size is compatible(image file size may not be bigger than the video Size) 
        let videoSize = ''//TODO FFPROBE
        let imageSize = ''//TODO FFPROBE

        //check if image is bigger than video
        // if true throw error

        
        
    }

    TimeParamsValid(){
        // compares videoFile length with the time param and returns true when the param is not longer than the videoLenght
    }



}