const fs = require('fs');
const uuid = require('uuid-with-v6');

// let newCode = uuid.v6()
var filePath = "codes.json"

var codes = [];

async function asyncFnc() {
    for (let i = 0; i < 21000; i++) {
        await codes.push(uuid.v6())
    }
    await console.log(codes)

    let codesJson = await JSON.stringify(codes);

    await console.log(codesJson)

    await fs.writeFile(filePath, codesJson, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("codes is saved!");
    });
}


asyncFnc()



