const fs = require("fs");
const readline = require("readline");

const filePath = "./GRE_8000_Words.txt";
const outputFilePath = "./words-html-8000.html"; // Specify the output file path
const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const outputStream = fs.createWriteStream(outputFilePath); // Create a write stream
outputStream.write(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            padding:0 60px 0 60px;
        }
        .word-list {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
            
            /* Add this line */
        }

        .word-list td {
            border: 1px solid #ccc;

            /* max-width: 100%;
            white-space: nowrap; */
            /* width: 0.1%;
            white-space: nowrap; */

        }

        .word-list tr td.word {
            font-size: 40px;
            font-weight: 300;
            padding-left: 10px;
            letter-spacing: .5px;
        }

        .word-list tr td.dictionary {
            width: 100%;
        }
        .word-list tr td.cn {
            min-width: 200px;
            cursor: pointer;
        }

        .word-list tr td.cn.hiding .cn-word {
            display: none;
        }
    </style>

    <script>

    function toggleHide(element) {
        element.classList.toggle('hiding');
    }
</script>
</head>

<body>
    <h1>Words 8000</h1>
    <table id="wordList" class="word-list">`); // Write the opening bracket of the JSON array
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
    // console.log(item);

    const trString = `<tr>
                <td class="word">${item.en}</td>
                <td class="phonetic">${item.ph}</td>
                <td class="type">${item.type}</td>
                <td class="cn hiding" onclick="toggleHide(this)">
                    <span class="arrow">>></span>
                    <span class="cn-word">${item.cn}</span>
                </td>
                <td class="dictionary" >
                    <a href="http://www.wordcyclopedia.com/english?${item.en}" target="_blank">Dictionary</a>
                </td>
                </tr>
                `

    // Write the item object to the output file
    outputStream.write(trString + "\n");
});

rl.on("close", () => {
    console.log("File reading completed.");
    outputStream.write(`</table>
</body>

</html>`); // Write the closing bracket of the JSON array
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

