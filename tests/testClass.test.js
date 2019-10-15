import TestClass  from "../src/testClass";
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }
describe("TestClass test", () => {
    it("print Hello World", () => {
        let input = "Hello Test";
        let t = new TestClass(input);
        expect(global.console.log).toHaveBeenCalledWith(input)
    });
})

