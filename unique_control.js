const fs = require('fs');
const QRCode = require('qrcode');

const folderPath = __dirname + "/qrcodes/";
var codes1FilePath = "codes_1.json";
var codes2FilePath = "codes_2.json";

var codes1 = [];


fs.readFile(codes1FilePath, (err, data) => {
    if (err) throw err;
    codes1 = JSON.parse(data)

    fs.readFile(codes2FilePath, (err, data) => {
        if (err) throw err;
        codes2 = JSON.parse(data)

        var codes = codes1

        codes2.forEach(e => {
            codes.push(e)
        });

        console.log(codes.length)

        console.log(removeusingSet(codes).length);
    });
});

function removeusingSet(arr) {
    let outputArray = Array.from(new Set(arr))
    return outputArray
}