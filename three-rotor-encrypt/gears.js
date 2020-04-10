const initSlowGear = [  [24, 21],  [25, 3],  [26, 15],  [1, 1],  [2, 19],  [3, 10],  [4, 14],  [5, 26],  [6, 20],  [7, 8],  [8, 16],  [9, 7],  [10, 22],  [11, 4],  [12, 11],  [13, 5],  [14, 17],  [15, 9],  [16, 12],  [17, 23],  [18, 18],  [19, 2],  [20, 25],  [21, 6],  [22, 24],  [23, 13],];
const initMiddleGear = [  [26, 20],  [1, 1],  [2, 6],  [3, 4],  [4, 15],  [5, 3],  [6, 14],  [7, 12],  [8, 23],  [9, 5],  [10, 16],  [11, 2],  [12, 22],  [13, 19],  [14, 11],  [15, 18],  [16, 25],  [17, 24],  [18, 13],  [19, 7],  [20, 10],  [21, 8],  [22, 21],  [23, 9],  [24, 26],  [25, 17],];
const initFastGear = [  [1, 8],  [2, 18],  [3, 26],  [4, 17],  [5, 20],  [6, 22],  [7, 10],  [8, 3],  [9, 13],  [10, 11],  [11, 4],  [12, 23],  [13, 5],  [14, 24],  [15, 9],  [16, 12],  [17, 25],  [18, 16],  [19, 19],  [20, 6],  [21, 15],  [22, 21],  [23, 2],  [24, 7],  [25, 1],  [26, 14],];
const chars = [  "A",  "B",  "C",  "D",  "E",  "F",  "G",  "H",  "I",  "J",  "K",  "L",  "M",  "N",  "O",  "P",  "Q",  "R",  "S",  "T",  "U",  "V",  "W",  "X",  "Y",  "Z",];

const mod26 = inputNumber => (inputNumber+26) %26;

const gears = {
  accumulateCount: 0,
  initial: { fast: initFastGear, middle: initMiddleGear, slow: initSlowGear },
  get fastGearOffset() {
    return mod26(this.accumulateCount);
  },
  get middleGearOffset() {
    return mod26(Math.floor(this.accumulateCount / 26));
  },
  get slowGearOffset() {
    return mod26(Math.floor(Math.floor(this.accumulateCount / 26) / 26));
  },
  searchGearLeft(gear, targetLeftIndex,targetOffset) {
    const target = gear[mod26(targetLeftIndex-targetOffset)];
    return mod26(gear.findIndex(x => x[1] === target[0]) + targetOffset);
  },
  searchGearRight(gear, targetRightIndex,targetOffset) {
    const target = gear[mod26(targetRightIndex-targetOffset)];
    return mod26(gear.findIndex(x => x[0]===target[1]) + targetOffset);
  },
  handleInput(char) {
    const slowGearIndex = char.toUpperCase().charCodeAt() - 65;
    const middleGearIndex = this.searchGearLeft(this.initial.slow,slowGearIndex,this.slowGearOffset);
    const fastGearIndex = this.searchGearLeft(this.initial.middle,middleGearIndex,this.middleGearOffset);
    const resultGearIndex = this.searchGearLeft(this.initial.fast,fastGearIndex,this.fastGearOffset);
    this.accumulateCount++;
    return chars[resultGearIndex];
  },
  handleOutput(char) {
    this.accumulateCount -- ;
    const fastGearIndex = char.toUpperCase().charCodeAt() - 65;
    const middleGearIndex = this.searchGearRight(this.initial.fast,fastGearIndex,this.fastGearOffset);
    const slowGearIndex = this.searchGearRight(this.initial.middle,middleGearIndex,this.middleGearOffset);
    const resultGearIndex = this.searchGearRight(this.initial.slow,slowGearIndex,this.slowGearOffset);
    return chars[resultGearIndex];
  },
};

module.exports = { gears};