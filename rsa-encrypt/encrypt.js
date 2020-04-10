function encryptNumber(num, e, n) {
  return parseInt(BigInt(num) ** BigInt(e) % BigInt(n));
}

/**
 * @param {string} str
 */
function encryptString(str, e, n) {
  return Buffer.from(
    str
      .split("")
      .map((char) => encryptNumber(char.charCodeAt(), e, n))
      .join(" ")
  ).toString("base64");
}

module.exports = { encryptNumber, encryptString };
