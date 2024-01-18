const fs = require("fs");
const readline = require("readline");

const filePath = "./GRE_8000_Words.txt";
const outputFilePath = "./word8000.js"; // Specify the output file path
const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const outputStream = fs.createWriteStream(outputFilePath); // Create a write stream
outputStream.write("var words = ["); // Write the opening bracket of the JSON array
rl.on("line", (line) => {
    console.log(line);
    const cn = getCn(line);
    const type = getWordType(line);
    const ph = getPhonetic(line);
    const en = getEnWord(line);
    const item = {
        en,
        ph,
        type,
        cn
    }
    console.log(item);

    // Write the item object to the output file
    outputStream.write(JSON.stringify(item) + ",\n");
});

rl.on("close", () => {
    console.log("File reading completed.");
    outputStream.write("]"); // Write the closing bracket of the JSON array
    outputStream.end(); // Close the output stream when done writing
});


function findLastIndex(string, char) {
    const lastIndex = string.lastIndexOf(char);
    return lastIndex;
}


function findFirstIndex(string, char) {
    const lastIndex = string.indexOf(char);
    return lastIndex;
}

function getWord(string, startIndex, endIndex) {
    let word = "";
    if (endIndex === undefined) {
        word = string.slice(startIndex);
        return word;
    } else {
        word = string.slice(startIndex, endIndex);
        return word;
    }
}

function getEnWord(string) {
    const enWord = getWord(string, 0, findFirstIndex(string, "["));
    return enWord.trim();
}

function getPhonetic(string) {
    const enWord = getWord(string, findFirstIndex(string, "["), findFirstIndex(string, "]") + 1);
    return enWord.trim();
}

function getWordType(string) {
    const typeString = getWord(string, findFirstIndex(string, "]") + 1);
    const enWord = getWord(typeString, 0,  findFirstIndex(typeString, ".")+1 );
    return enWord.trim();
}

function getCn(string) {
    const enWord = getWord(string, findLastIndex(string, ".") + 1);
    return enWord.trim();
}

