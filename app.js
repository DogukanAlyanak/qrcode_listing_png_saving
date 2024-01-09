/* v1.2.2.2401091049 */

const fs = require('fs');
const uuid = require('uuid-with-v6');
const QRCode = require('qrcode');



// --- CREATE AND SAVE UNIQUE CODES /////////////////////////////
var PartyNo = 0;
var codesFilePath = __dirname + "/party/" + PartyNo + "/codes.json"
var folderPath = __dirname + "/party/" + PartyNo + "/qrcodes";

var codes = [];
var partNo = 0
let doneSavedImageCount = 0

if (!fs.existsSync(__dirname + "/party")) {
    fs.mkdirSync(__dirname + "/party");
}


// start event
findPartyNo()

function findPartyNo() {
    do {
        ++PartyNo
    } while (fs.existsSync(__dirname + "/party/" + PartyNo));

    if (!fs.existsSync(__dirname + "/party/" + PartyNo)) {
        codesFilePath = __dirname + "/party/" + PartyNo + "/codes.json"
        folderPath = __dirname + "/party/" + PartyNo + "/qrcodes";

        fs.mkdirSync(__dirname + "/party/" + PartyNo);
        createAndSaveCodes();
    }
}

async function createAndSaveCodes() {
    for (let i = 0; i < 21000; i++) {
        await codes.push(uuid.v6())
    }
    await console.log(codes)

    let codesJson = await JSON.stringify(codes);

    await console.log(codesJson)

    await fs.writeFile(codesFilePath, codesJson, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        // start qr png files save
        fs.readFile(codesFilePath, (err, data) => {
            if (err) throw err;
            codes = JSON.parse(data)
            savePartPart()
        });
    });
}


async function savePartPart() {
    if (partNo > 220) {
        return "is all done";
    }
    ++partNo;
    let end = partNo * 100;
    let start = end - 100 - 1;

    for (let i = start; i < end; i++) {
        let code = codes[i]
        if (codes[i] != undefined) {
            console.log(code + " is added to queue ...")
            await saveQRFile(codes[i])
        }
    }

    await console.log(start + " - " + end + " added to queue. files creating ...");
}


async function saveQRFile(code) {
    let filename = code + ".png";

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    await QRCode.toFile(folderPath + "/" + filename, code, {
        errorCorrectionLevel: 'H',
        width: 256
    }, function (err) {
        if (err) throw err
        ++doneSavedImageCount

        let end = partNo * 100;
        let start = end - 100 - 1;

        if (doneSavedImageCount == end) {
            start + " - " + end + " files is saved."

            // callback
            savePartPart()
        }
    })
}