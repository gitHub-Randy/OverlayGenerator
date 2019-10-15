import InputChecker from "../src/inputChecker";

describe("InputChekcer  test", () => {
    it("get arguments returns arguments when given", () => {
        let ic = new InputChecker();


        let input = "Hello Test";
        let t = new TestClass(input);
        expect(global.console.log).toHaveBeenCalledWith(input)
    });

    // file checker

    it("fileExists return true when file exists", () => {
        let ic = new InputChecker();
        let videoFile = '../testVideo.mp4';
        expect(ic.fileExists(videoFile)).to.beTruthy();
    });

    it("fileExists return error when file does not exist", () => {
        try {
            let ic = new InputChecker();
            let videoFile = '../NotExistingFile.mp9000';
            ic.fileExists(videoFile);
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });

    // video
    it("videoExtensionIsValid return true when file has acceptable extensions", () => {
        let ic = new InputChecker();
        let videoFile = '../testVideo.mp4';
        expect(ic.videoExtensionIsValid(videoFile)).to.beTruthy();
    });

    it("videoExtensionIsValid return false when file has not acceptable extensions", () => {
        try {
            let ic = new InputChecker();
            let videoFile = '../NotExistingFile.mp9000';
            ic.videoExtensionIsValid(videoFile)
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });

    // image

    it("ImageExtensionIsValid return true when file has right extension", () => {
        let ic = new InputChecker();
        let imageFile = '../testImage.png';
        expect(ic.imageExtensionIsValid(imageFile)).to.beTruthy();
    });


    it("ImageExtensionIsValid return error when file has wrong extension", () => {
        try {
            let ic = new InputChecker();
            let imageFile = '../nonsense.http';
            ic.imageExtensionIsValid(imageFile)
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });


    // other options

    //ffprobe
    // position
    it("positionIsValid returns true when position is smaller then underlay video", () => {
        let ic = new InputChecker();
        let imageFile = '../testImage.png';
        let videoFile = '../testVideo.mp4'
        let pos = ''// TODO: value invullen
        expect(ic.positionIsValid(videoFile, imageFile, position)).to.beTruthy();
    });

    it("positionIsValid returns error when position is bigger than underlay video", () => {
        try {
            let ic = new InputChecker();
            let imageFile = '../nonsense.http';
            let imageFile = '../testImage.png';
            let videoFile = '../testVideo.mp4'
            let pos = ''// TODO: value invullen
            ic.positionIsValid(videoFile, imageFile, position)
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });

    // FFPROBE
    // time
    it("TimeParamsValid returns error when TimeParamsAre Longer than underlay video", () => {
        let ic = new InputChecker();
        let imageFile = '../testImage.png';
        let videoFile = '../testVideo.mp4'
        let time = ''// TODO: value invullen
        expect(ic.TimeParamsValid(videoFile, time)).to.beTruthy();
    });

    it("TimeParamsValid returns true when TimeParamsAre <= than underlay video", () => {
        try {
            let ic = new InputChecker();
            let imageFile = '../nonsense.http';
            let imageFile = '../testImage.png';
            let videoFile = '../testVideo.mp4'
            let time = ''// TODO: value invullen
            ic.TimeParamsValid(videoFile, time)
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });
});

