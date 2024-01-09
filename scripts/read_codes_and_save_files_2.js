const fs = require('fs');
const QRCode = require('qrcode');

const folderPath = __dirname + "/qrcodes";
var codesFilePath = "codes.json"


var codes
fs.readFile(codesFilePath, (err, data) => {
    if (err) throw err;
    codes = JSON.parse(data)
    savePartPart()
});

var partNo = 0
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

let donSavedImageCount = 0
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
        ++donSavedImageCount

        let end = partNo * 100;
        let start = end - 100 - 1;
        if (donSavedImageCount == end) {
            start + " - " + end + " files is saved ..."
            savePartPart()
        }
    })
}