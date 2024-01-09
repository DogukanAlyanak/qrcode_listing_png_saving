const fs = require('fs');
const QRCode = require('qrcode');

const folderPath = __dirname + "/qrcodes/";
var codesFilePath = "codes.json"


fs.readFile(codesFilePath, (err, data) => {
    if (err) throw err;
    codes = JSON.parse(data)
    console.log(codes.length)
    savePartPart(codes)
});

async function savePartPart(codes) {
    let end = 21100;
    let start = end - 1200 - 2;

    for (let i = start; i < end; i++) {
        let code = codes[i]
        if (codes[i] != undefined) {
            console.log(code + " is creating ...")
            await saveQRFile(codes[i])
        }
    }

    await console.log(start + " - " + end + " created, but saving for now!");
}

async function saveQRFile(code) {
    let filename = code + ".png";

    await QRCode.toFile(folderPath + filename, code, {
        errorCorrectionLevel: 'H',
        width: 256
    }, function (err) {
        if (err) throw err;
    });
}

