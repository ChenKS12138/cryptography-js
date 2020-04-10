function decryptNumber(num, d, n) {
  return parseInt(BigInt(num) ** BigInt(d) % BigInt(n));
}

/**
 * @param {string} str
 */
function decryptString(str, d, n) {
  return Buffer.from(str, "base64")
    .toString()
    .split(" ")
    .map((x) => decryptNumber(parseInt(x), d, n))
    .map(String.fromCharCode)
    .join("");
}

module.exports = { decryptNumber, decryptString };
