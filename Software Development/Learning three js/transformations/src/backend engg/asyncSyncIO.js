const fs = require("fs");

console.log("Before ==>:");
const res = fs.readFileSync("test.txt");
// fs.readFile("test1.txt", console.log);
console.log("IO: "+res);
console.log("After <==:");
 