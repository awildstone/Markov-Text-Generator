/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');
const { htmlToText } = require('html-to-text');

function catFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            let mm = new markov.MarkovMachine(data);
            console.log(mm.makeText());
        }
    });
}

async function catURL(path) {
    try {
        let response = await axios.get(path);
        let text = htmlToText(response.data);
        let mm = new markov.MarkovMachine(text);
        console.log(mm.makeText());
    } catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}

let type = process.argv[2];
let path = process.argv[3];

if (type === 'file') {
    catFile(path);
} else if (type === 'url') {
    catURL(path);
} else {
    console.error(`Unknown Command: ${type}`);
    process.exit(1);
}