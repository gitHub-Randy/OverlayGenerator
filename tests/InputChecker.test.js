import InputChecker from "../src/inputChecker";
import { isTSAnyKeyword } from "@babel/types";

describe("InputChekcer  test", () => {
    

    //Generall Class function test
    it("checkInput returns true when valid input is given",async  () => {
        let ictrue = new InputChecker('./testVideo.mp4', './testImage.png', 1280 / 3 * 2, 0, 0, 35);
        try{
            let cI = await ictrue.checkInput();

            expect(cI).toBeTruthy();
        }catch(e){

        }
     
    });

    it("checkInput returns false when invalid input is given", async () => {
        try{
            let icFalse = new InputChecker('./nonsense.mp4', './nonsense.png', 1280 / 3 * 2, 0, 0, 35);
            let cI = true;
            cI = await icFalse.checkInput();
        }catch(e){
            expect(e).not.toBeNull();
        }
 
    });


    // Single Methods tests


    // tests fileExists() and ffprobe
    it("getMeidaInformation returns mediaInformation when file exists", async () => {
        let ictrue = new InputChecker('./testVideo.mp4', './testImage.png', 1280 / 3 * 2, 0, 0, 35);
        let cI;
        try{
            cI = await ictrue.getMediaInformation('./testImage.png');
            expect(cI).not.toBeNull();
        }catch(e){

        }
       
    });
    // tests fileExists() and ffprobe
    it("getMeidaInformation throws error when file does not  exist", async () => {
        let icFalse = new InputChecker();
        try{
            let cI;
           cI = await icFalse.getMediaInformation('./nonsense.mp4');
        }catch(e){
            expect(e).not.toBeNull();
        }
        
    });


    it("ExtensionIsValid returns true when file has .mp4 as extension", () => {
        let ictrue = new InputChecker('./testVideo.mp4', './testImage.png', 1280 / 3 * 2, 0, 0, 35);

        let cI = false;
        cI = ictrue.ExtensionIsValid(`${process.cwd}\\tests\\testVideo.mp4`, ['.mp4']);
        expect(cI).toBeTruthy();
    });


    it("ExtensionIsValid returns false when file has  NOT .png as extension", () => {
        let icFalse = new InputChecker('./nonsense.mp4', './nonsense.png', 1280 / 3 * 2, 0, 0, 35);

        let cI = true;
        cI = icFalse.ExtensionIsValid('./testVideo.mp4', ['.png']);
        expect(cI).toBeFalsy();
    });


    it("positionIsValid returns true when yPosition  && xPosition is inBounds ",  () => {
        let ictrue = new InputChecker('./testVideo.mp4', './testImage.png', 1280 / 3 * 2, 0, 0, 35);

        let cI = false;

        cI = ictrue.positionIsValid({
            streams:
                [{
                    index: 0,
                    codec_name: 'h264',
                    codec_long_name: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
                    profile: 'High 4:4:4 Predictive',
                    codec_type: 'video',
                    codec_time_base: '1/60',
                    codec_tag_string: 'avc1',
                    codec_tag: '0x31637661',
                    width: 1280,
                    height: 556
                }]
        }, 0, 0);
        expect(cI).toBeTruthy();
    });


    it("positionIsValid returns false when yPosition  || xPosition is outBounds ",  () => {
        let icFalse = new InputChecker('./testVideo.mp4', './testImage.png', 1280 / 3 * 2, 0, 0, 35);

        let cI = true;
        cI =  icFalse.positionIsValid({
            streams:
                [{
                    index: 0,
                    codec_name: 'h264',
                    codec_long_name: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
                    profile: 'High 4:4:4 Predictive',
                    codec_type: 'video',
                    codec_time_base: '1/60',
                    codec_tag_string: 'avc1',
                    codec_tag: '0x31637661',
                    width: 1280,
                    height: 556
                }]
        }, 1380, 800);
        expect(cI).toBeFalsy();
    });


    it(" TimeParamsValid returns true  when vidLenght >= endTime && beginTime > 0 ", () => {
        let ictrue = new InputChecker('./testVideo.mp4', './testImage.png', 1280 / 3 * 2, 0, 0, 35);

        let cI = false;
        cI = ictrue.TimeParamsValid(39, 10, 20);
        expect(cI).toBeTruthy();
    });


    it(" TimeParamsValid returns false  when vidLenght < endTime ||  beginTime < 0 ", async () => {
        let icFalse = new InputChecker('./nonsense.mp4', './nonsense.png', 1280 / 3 * 2, 0, 0, 35);

        let cI = true;
        cI = icFalse.TimeParamsValid(39, -10, 40);
        expect(cI).toBeFalsy();
    });
});

