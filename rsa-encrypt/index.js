const { encryptString, encryptNumber } = require("./encrypt");
const { decryptString, decryptNumber } = require("./decrypt");
const { generateKey } = require("./generateKey");

const { private, public } = generateKey();

const num = "hello";

const numEncrypted = encryptString(num, public.e, public.n);

console.log(`Encryption: ${num}  =>  ${numEncrypted}`);

console.log(
  `Decryption: ${numEncrypted}   =>  %s`,
  decryptString(numEncrypted, private.d, private.n)
);
