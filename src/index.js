'use strict'

import InputChecker from "./inputChecker";
import Overlayer from "./overlayer";

async function inputChecker(){
    try{
        let inputChecker = new InputChecker(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage.png`, 0, 720/3*2, '0','39' );
        let cI =   await inputChecker.checkInput();
        console.log(cI);
    
    }catch(error){
        console.log(error);
    }     
}

async function Overlay(){
    try{
        let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage2.png`, 0, 260, '5','39');
        overlayer.executeCommand();
    }catch(e){
        console.log(e);

    }
}

Overlay();   
