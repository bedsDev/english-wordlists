const fs = require('fs');
const path = require('path');

const filepaths = path.join(__dirname,"..", 'word8000.js');
const wordString = fs.readFileSync(filepaths, 'utf8');

console.log(wordString);
{
    eval(wordString);

    console.log(words);
}

words.forEach(word => {
    word.en = word.en.replace(/,/g, 'ˌ');
    word.ph = word.ph.replace(/,/g, 'ˌ');
    word.type = word.type.replace(/,/g, 'ˌ');
    word.cn = word.cn.replace(/,/g, 'ˌ');
})
words.sort((a, b) => a.en.localeCompare(b.en));

words.sort((a, b) => a.en.localeCompare(b.en));
const totalWords = words.length;
const setp = 200;

for (let i = 0; i < totalWords; i += setp) {
    const filename = `word8000-sorted-${i.toString().padStart(4, '0')}.csv`;
    console.log(filename);

    const wordsSlice = words.slice(i, i + setp);
    const csv = arrayToCsv(wordsSlice);
    wirteCsvToFile(filename, csv);
}


// Convert words array to CSV format
// const csv = words.map(word => {
//     // Object.values(word)
//     const arr = [word.en, word.cn , word.ph, word.type];
//     return arr.join(',')
// }).join('\n');

// Write CSV to a file
// fs.writeFile('word8000-sorted.csv', csv, (err) => {
//     if (err) throw err;
//     console.log('CSV file has been saved!');
// });

function arrayToCsv(words){
    const csv = words.map(word => {
        // Object.values(word)
        const arr = [word.en, word.cn , word.ph, word.type];
        return arr.join(',')
    }).join('\n');
    return  csv;
}

function wirteCsvToFile(filename, data  ){
    // fs.writeFile('word8000-sorted.csv', csv, (err) => {
    fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log(filename, ' file has been saved!');
    });
}