const { encrypt } = require("./encrypt");
const { decrypt } = require("./decrypt");

const rawString = "AAAAAAAAAAAAAAAAA";
console.log("明文为：" + rawString);
const encrypted = encrypt(rawString);
console.log("明文加密后为：" + encrypted);
const decrypted = decrypt(encrypted);
console.log("密文解密后为：" + decrypted);
