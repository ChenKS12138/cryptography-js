const { gears } = require("./gears");

function encrypt(rawString) {
  return rawString
    .split("")
    .map((char) => {
      const newChar = gears.handleInput(char);
      // console.log(char, newChar);
      return newChar;
    })
    .join("");
}

module.exports = { encrypt };
