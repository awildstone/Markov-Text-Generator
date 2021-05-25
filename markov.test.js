const { MarkovMachine } = require('./markov');

describe("The generated text is less than the given number of words.", () => {
    let mm;
    let mm2;
    
    beforeEach(() => {
        mm = new MarkovMachine("the cat in the hat is in the hat");
        mm2 = new MarkovMachine("I do not like them with a mouse");
    });

    test("Creates less than provided numWords words.", () => {
        let text1 = mm.makeText(numWords=5);
        let text2 = mm2.makeText(numWords=20)
        expect(text1.split(" ").length).toBeLessThanOrEqual(5);
        expect(text2.split(" ").length).toBeLessThanOrEqual(20);
    });
});