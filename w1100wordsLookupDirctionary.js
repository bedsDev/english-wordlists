const https = require('https');
const fs = require('fs');
// File path
const filePath = 'word1100.lookup.txt';

// Content to append
const contentToAppend = 'This is the content to append.\n';
const fd = fs.openSync(filePath, 'a');

const words1100 = [
"acknowledged",
"adversary",
"alleged",
"amorous",
"apathy",
"appalled",
"archaic",
"ascend",
"ascertain",
"attenuated",
"atypical",
"audacity",
"automaton",
"awesome",
"bagatelle",
"barometer",
"belligerent",
"bias",
"blase",
"bona",
"brigand",
"buff",
"bulwark",
"burgeoned",
"catastrophic",
"chimerical",
"cliche",
"condolence",
"cope",
"courant",
"crave",
"culminate",
"cumulative",
"cuny",
"decade",
"decapitate",
"deem",
"defamatory",
"degrade",
"delineation",
"demeanor",
"denigrated",
"deplorable",
"deploy",
"derived",
"detriment",
"diminutive",
"disgruntled",
"dispersed",
"doddering",
"elapse",
"emaciated",
"emanating",
"encumbrance",
"enervated",
"engrossed",
"enigma",
"eruption",
"evaluate",
"eventuate",
"excruciating",
"expedite",
"extenuating",
"extortion",
"exultation",
"fide",
"flabbergasted",
"foist",
"foreboding",
"forthwith",
"fretful",
"fruitless",
"genocide",
"hapless",
"histrionics",
"idyllic",
"ilk",
"imperceptible",
"impious",
"implacable",
"inadvertent",
"incapacitated",
"incoherent",
"incompatibility",
"incongruous",
"incredulous",
"indifference",
"indiscriminate",
"inebriated",
"inevitable",
"infallible",
"infamous",
"inflicted",
"inherent",
"inhibition",
"interject",
"intrinsic",
"invalidate",
"irrational",
"irrelevant",
"jocose",
"knell",
"laudable",
"lax",
"lift",
"liquidation",
"lugubrious",
"Machiavellian",
"maladjusted",
"malady",
"malnutrition",
"martinet",
"mastiff",
"materialism",
"matron",
"mercenruy",
"metamorphosis",
"milieu",
"mortal",
"motivate",
"munificent",
"myrtad",
"negligible",
"neurotic",
"nirvana",
"nondescript",
"nutritive",
"obsolescence",
"opprobrium",
"opulence",
"originate",
"ostentatious",
"parsimonious",
"passe",
"patriarch",
"perceive",
"perpetrate",
"persevere",
"phenomenon",
"placard",
"potent",
"precedent",
"prescient",
"prevalent",
"prevarication",
"prohibition",
"propinquity",
"proximity",
"raiment",
"ramifications",
"rash",
"rationalize",
"regimen",
"remote",
"remuneration",
"repress",
"reputed",
"restrictive",
"retrospect",
"reverberating",
"reviled",
"rhetoiic",
"risible",
"romp",
"salubiious",
"salvation",
"sanctuary",
"satiety",
"serenity",
"singular",
"site",
"slovenly",
"steeped",
"stentoiian",
"stunted",
"subseIVient",
"succulent",
"supplication",
"symptomatic",
"taint",
"technology",
"termagant",
"therapy",
"tiivial",
"tolerate",
"tradition",
"tranquil",
"truncated",
"unabated",
"universal",
"unsavory",
"urbane",
"vehemently",
"venerable",
"vexatious",
"vicissitudes",
"vigil",
"virile",
"Vituperation",
];


const urlPre = 'dictionary.com/browse/';

function lookupWord(word) {
    const url = urlPre + word + '?q=' + word;
    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            // console.log(data);
            const r = parsingDefinition(data);
            const entry = {
                word: word,
                definition: r.definition,
                pos: r.pos,
                phon: r.phon
            }
            console.log(entry);
            fs.appendFileSync(fd, JSON.stringify(entry) + '\n');
            // Process the received data here
        });
    }).on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
}



function parsingDefinition(data) {
    const definition = data.match(/hclass="def"(.*?)>(.*?)<\/span>/);
    const pos = data.match(/hclass="pos">(.*?)<\/span>/);
    const phon = data.match(/class="phon">(.*?)<\/span>/);

    // console.log(definition[1]);
    // console.log(pos[1]);
    // console.log(phon[1]);

    return {
        definition: definition ? definition[2] : null,
        pos: pos ? pos[1] : null,
        phon: phon ? phon[1] : null
    }
}


// lookupWord('amorous');

function app() {
    words1100.forEach((word, i) => {
        setTimeout(() => {

            lookupWord(word);
        }, i * 5000);
    });
}
app();




