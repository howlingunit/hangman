const fs = require("fs");

let file = fs.readFileSync(`${process.argv[2]}.txt`, "utf-8");
file = file.split("\n");
filev2 = [];
for (const i of file){
    filev2.push(i.replace("\r", ""));
}
console.log(filev2);
const out = JSON.stringify(filev2);
fs.writeFileSync(`${process.argv[2]}.json`,out);