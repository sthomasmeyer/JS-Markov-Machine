class MarkovMachine {
  constructor(text) {
    // JavaScript's [split()] method splits a string into an array...
    // of substrings. In this case, we are splitting the given string...
    // at a [" "] (space)-character, a [/r] (Carriage Return)-character...
    // or a [\n] (new-line)-character.
    let words = text.split(/[ \r\n]+/);

    // JavaScript's [filter()] method creates a new array w/ all of...
    // the elements that "pass" the test implemented by the provided...
    // function. In this case, undefined or null characters will FAIL...
    // every other character will pass.
    this.words = words.filter((c) => c !== '');
    this.makeChains();
  }

  makeChains() {
    // Create an instance of JavaScript's [Map] object, which holds...
    // key-value pairs. Note, [Map]s are iterable, and perform well...
    // in scenarios involving frequent additions (+) removals of key-value pairs.
    let chains = new Map();
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }

  // The [static] keyword defines a "static" method or property for...
  // a class. Neither static methods nor properties can be called...
  // on instances of the class. Instead, they're called on the...
  // class itself. In this case, the [choice()] method accepts an...
  // array, and returns a random element from the given array.
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  makeText(numWords = 100) {
    // The [Array.from()] method creates a new shallow-copied [Array]...
    // instance from an array-like or iterable object. In this case...
    // it will return an [Array]-instance from the "keys" held by...
    // the "chains" instance of the [Map] object we created.
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(' ');
  }
}

module.exports = { MarkovMachine };
