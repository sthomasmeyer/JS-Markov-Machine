// The Node.js [require()] function is remarkably similar to...
// the [import] command in Python. It is the easiest way to...
// incorporate modules that exist in separate files.

// [fs] is short for "file system", and Node's [fs] module...
// provides useful tools for storing, accessing, and managing...
// data. It is most commonly used to read, create, update...
// delete, and rename files.
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
// The [process] object provides info about (+) control over...
// the current Node.js process.
const process = require('process');

function generateText(text) {
  // Create a new instance of the [MarkovMachine] class, (+)...
  // log the result of its [makeText()] method in the conosle.
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(path) {
  // The [readFile()] method accepts three parameters...
  // 1) filename, 2) encoding, and 3) callback_function.
  fs.readFile(path, 'utf8', function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(l);
    } else {
      generateText(data);
    }
  });
}

async function makeURLText(url) {
  let res;

  try {
    res = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(l);
  }
  generateText(res.data);
}

// Node's [process.argv] property returns an array containing the...
// command-line arguments passed when the Node.js process was launched.
let [method, path] = process.argv.slice(2);

if (method === 'file') {
  makeText(path);
} else if (method === 'url') {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(l);
}
