'use strict'

import InputChecker from "./inputChecker";

async function inputChecker(){
    try{
        let inputChecker = new InputChecker(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage.png`, 0, 720/3*2, '0','39' );

        let cI =   await inputChecker.checkInput();
        console.log(cI);
    
    }catch(error){
        console.log(error);
    }     
}

inputChecker();
   
