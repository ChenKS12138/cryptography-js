const { gears } = require("./gears");

function decrypt(rawString) {
  gears.accumulateCount = rawString.length;
  return rawString
    .split("")
    .reverse()
    .map((char) => gears.handleOutput(char))
    .reverse()
    .join("");
}

module.exports = { decrypt };
