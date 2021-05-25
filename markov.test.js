const { MarkovMachine } = require('./markov');

describe("The generated text is less than the given number of words.", () => {
    let mm;
    let mm2;
    
    beforeEach(() => {
        mm = new MarkovMachine("the cat in the hat is in the hat");
        mm2 = new MarkovMachine("I do not like them with a mouse");
    });

    test("Creates less than 5 words.", () => {
        let text1 = mm.makeText(numWords=5);
        expect(text1.split(" ").length).toBeLessThanOrEqual(5);
    });

    test("Creates less than 20 words.", () => {
        let text2 = mm2.makeText(numWords=20);
        expect(text2.split(" ").length).toBeLessThanOrEqual(20);
    })

    test("Creates less than 100 words.", () => {
        let text2 = mm2.makeText();
        expect(text2.split(" ").length).toBeLessThanOrEqual(100);
    })
});

describe("The generated text does not contain null or undefined.", () => {
    let mm;
    let mm2;
    
    beforeEach(() => {
        mm = new MarkovMachine("the cat in the hat is in the hat");
        mm2 = new MarkovMachine("I do not like them with a mouse");
    });

    test("The text does not contain null.", () => {
        let text1 = mm.makeText();
        expect('null').toEqual(expect.not.stringContaining(text1));
    });

    test("The text does not contain undefined.", () => {
        let text2 = mm2.makeText();
        expect('undefined').toEqual(expect.not.stringContaining(text2));
    });

});

describe("The generated text is not null or undefined.", () => {
    let mm;
    let mm2;
    
    beforeEach(() => {
        mm = new MarkovMachine("the cat in the hat is in the hat");
        mm2 = new MarkovMachine("I do not like them with a mouse");
    });

    test("The generated text is not null.", () => {
        let text1 = mm.makeText();
        expect(text1).not.toBeNull();
    });

    test("The generated text is not undefined.", () => {
        let text2 = mm2.makeText();
        expect(text2).not.toBeUndefined();
    });

});