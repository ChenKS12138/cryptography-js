const { encrypt } = require("./encrypt");
const { decrypt } = require("./decrypt");

const str = "888888";
const key = "101010";
const encrypted = encrypt(str, key);
console.log(str + " DES加密后为 " + encrypted);
console.log(encrypted + " DES解密后为 " + decrypt(encrypted, key));
