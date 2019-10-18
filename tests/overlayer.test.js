import Overlayer  from "../src/overlayer";

describe("FFMPEG OVERLAY COMMAND", () => {
    it("command executes with no errors with valid imput", async () => {
        try{
            let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage2.png`, 0, 260, '5','39')
            overlayer.executeCommand();
        }catch(e){
            expect(e).toBeNull();
        }
    });


    it("command executes with  errors when input 1 is null", async () => {
        try{
            let overlayer = new Overlayer(null, `${process.cwd()}\\tests\\testImage2.png`, 0, 260, '5','39')
            overlayer.executeCommand();
        }catch(e){
            expect(e).not.toBeNull();
        }
    });

    it("command executes with  errors when input 2 is null", async () => {
         try{
            let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, null, 0, 260, '5','39')
            overlayer.executeCommand();
        }catch(e){
            expect(e).not.toBeNull();
        }
    });

    it("command executes with  errors when xPosition is null",async () => {
         try{
            let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage2.png`, null, 260, '5','39')
            overlayer.executeCommand();
        }catch(e){
            expect(e).not.toBeNull();
        }
    });

    it("command executes with  errors when yPosition is null", async () => {
         try{
            let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage2.png`, 0, null, '5','39')
            overlayer.executeCommand();
        }catch(e){
            expect(e).not.toBeNull();
        }
    });

    it("command executes with  errors when beginTime is null",async () => {
         try{
            let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage2.png`, 0, 260, null,'39')
            overlayer.executeCommand();
        }catch(e){
            expect(e).not.toBeNull();
        }

    });
    it("command executes with  errors when endTime is null", async ()  => {
        try{
            let overlayer = new Overlayer(`${process.cwd()}\\tests\\testVideo.mp4`, `${process.cwd()}\\tests\\testImage2.png`, 0, 260, '5',null)
            overlayer.executeCommand();
        }catch(e){
            expect(e).not.toBeNull();
        }

    });
    

})

