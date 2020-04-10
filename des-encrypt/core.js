const { IP1, IP2, PC1, PC2, shifts, E_T, S_T, P_T } = require("./preset");

// bit数组转十进制数
const bits2dec = (bitArray) => {
  return bitArray.reduceRight((prev, current, index, array) => {
    const rightIndex = array.length - index - 1;
    return prev + current * Math.pow(2, rightIndex);
  }, 0);
};

// 十进制数转bit数组
const dec2bits = (num) => {
  const result = [];
  while (num) {
    result.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return result;
};

// 字符串转二进制分组bits
const str2bits = (str) => {
  if (!str.length) str = "00000000";
  const binStr = str
    .split("")
    .map((x) => x.charCodeAt().toString(2).padStart(8, "0"))
    .join("");
  return Array.from({ length: Math.ceil(binStr.length / 64) })
    .map((x, index) =>
      binStr.slice(index * 64, (index + 1) * 64).padEnd(64, "0")
    )
    .map((x) => x.split("").map((x) => parseInt(x)));
};

// 二进制分组bits转字符串
const bits2str = (bitArray) => {
  const charBits = [];
  bitArray = bitArray.reduce((prev, current) => prev.concat(current), []);
  while (bitArray.length) {
    charBits.push(bitArray.splice(0, 8));
  }
  return charBits.map((bits) => String.fromCharCode(bits2dec(bits))).join("");
};

// 置换IP
const ipChange = (group) => {
  const changedGroup = IP1.map((position) => group[position - 1]);
  const left = changedGroup.slice(0, 32);
  const right = changedGroup.slice(32);
  return [left, right];
};

// 逆置换IP
const revertIpChange = (left, right) => {
  const sum = left.concat(right);
  return IP2.map((position) => sum[position - 1]);
};

// 密码置换后分成两组28位
const changeKey = (keyString) => {
  const keyBin = str2bits(keyString)[0];
  const changedKey = PC1.map((position) => keyBin[position - 1]);
  const C0 = changedKey.slice(0, 28);
  const D0 = changedKey.slice(28);
  return [C0, D0];
};

// 循环左移${offset}位
const cycleLeftShift = (bitArray, offset) => {
  const items = bitArray.splice(0, offset);
  return bitArray.concat(items);
};

// 生成一个轮密钥
const generageSingleRoundKey = (C0, D0) => {
  const bitArray = C0.concat(D0);
  return PC2.map((x) => bitArray[x - 1]);
};

// 一次性生成所有48bit的密钥
const generateRoundKeys = (keyString) => {
  const [C0, D0] = changeKey(keyString);
  return shifts.reduce(
    (prev, current) => {
      prev.C0 = cycleLeftShift(prev.C0, current);
      prev.D0 = cycleLeftShift(prev.D0, current);
      prev.keys.push(generageSingleRoundKey(prev.C0, prev.D0));
      return prev;
    },
    { C0, D0, keys: [] }
  ).keys;
};

// 异或操作
const bitsXor = (bitArray1, bitArray2) => {
  return bitArray1.map((bit, index) => bit ^ bitArray2[index]);
};

// e盒扩展
const eBox = (bitArray) => {
  return E_T.map((position) => bitArray[position - 1]);
};

// s盒代替压缩
const sBox = (bitArray) => {
  const bitGroup = [];
  while (bitArray.length) {
    bitGroup.push(bitArray.splice(0, 6));
  }
  return bitGroup.map((bitGroupItem, boxIndex) => {
    const bit1 = bitGroupItem.shift();
    const bit2 = bitGroupItem.pop();
    const row = bits2dec([bit1, bit2]);
    const column = bits2dec(bitArray);
    return dec2bits(S_T[boxIndex][row][column]);
  });
};

// p盒置换
const pBox = (bitArray) => {
  return P_T.map((position) => bitArray[position]);
};

module.exports = {
  str2bits,
  ipChange,
  revertIpChange,
  generateRoundKeys,
  bitsXor,
  eBox,
  sBox,
  pBox,
  bits2str,
};
