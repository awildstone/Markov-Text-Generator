/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      //get two word pairs
      let word1 = this.words[i];
      let word2 = this.words[i + 1] || null;
      //if the 2nd word pair is null we reached the end, save chains and break out of the loop
      if (word2 === null) {
        this.chains = chains;
        break;
      }
      //combine pairs into one key, get the next word value
      let pair = word1.concat(' ', word2)
      let nextWord = this.words[i + 2] || null;
      //if the key already exists, append the word to the key array value
      if (pair in chains) {
        chains[pair].push(nextWord);
      } else {
        //add pair/value to chains
        chains[pair] = [nextWord];
      }
    }
  }

  /** Returns a random choice from an array. */

  getRandomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let randomWords = []
    //get array of keys and select a random key pair of words
    let keyPairs = Object.keys(this.chains);
    let words = this.getRandomChoice(keyPairs);

    while (numWords > 0 && !words.includes('null')) {
      //split the key pairs into two words
      let [word1, word2] = words.split(' ');
      //add the first word to results, then use the 2nd word + a random choice for next pair
      randomWords.push(word1);
      words = word2.concat(' ', this.getRandomChoice(this.chains[words]));
      numWords--;
    }
    return randomWords.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};

// let mm = new MarkovMachine("the cat in the hat is in the hat");
// console.log('MAKE TEXT DEFAULT (100): ')
// console.log(mm.makeText());

// let mm2 = new MarkovMachine("I do not like them with a mouse");
// console.log('MAKE TEXT (50): ')
// console.log(mm2.makeText(numWords=50));