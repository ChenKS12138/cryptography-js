const {
  bitsXor,
  eBox,
  generateRoundKeys,
  ipChange,
  pBox,
  revertIpChange,
  sBox,
  str2bits,
  bits2str,
} = require("./core.js");

// DES加密
function encrypt(str, secret) {
  const keys = generateRoundKeys(secret);
  const groups = str2bits(str);
  const groupsDevided = groups.map((x) => ipChange(x));

  // 16轮迭代
  keys.forEach((key) => {
    groupsDevided.forEach((groupDevided) => {
      const [left, right] = groupDevided;
      const newLeft = right;
      const newRight = bitsXor(left, pBox(sBox(bitsXor(eBox(right), key))));
      groupDevided[0] = newLeft;
      groupDevided[1] = newRight;
    });
  });

  const newGroup = groupsDevided.map((groupDevided) =>
    revertIpChange(groupDevided[1], groupDevided[0])
  );
  return bits2str(newGroup);
}

module.exports = { encrypt };
