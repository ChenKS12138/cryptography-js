const isPrime = (num) => {
  if (num < 2) return false;
  const end = Math.sqrt(num);
  let i = 2;
  while (i <= end) {
    if (num % i === 0) {
      return false;
    }
    i++;
  }
  return true;
};

const generateMinPrimeFactor = (num) => {
  if (num < 2) return null;
  let current = 2;
  while (current <= num && num % current === 0) {
    current++;
  }
  return current;
};

const generateBigPrime = () => {
  const MIN_PRIME = 9;
  const MAX_PRIME = 999;
  let value = 0;
  while (!isPrime(value)) {
    value = Math.floor(Math.random() * (MAX_PRIME - MIN_PRIME) + MIN_PRIME);
  }
  return value;
};

const generateD = (e, m) => {
  let k = 1n;
  e = BigInt(e);
  m = BigInt(m);
  while (true) {
    if ((k * m + 1n) % e === 0n) {
      return parseInt((k * m + 1n) / e);
    }
    k++;
  }
};

function generateKey() {
  const p = generateBigPrime();
  const q = generateBigPrime();
  const n = p * q;
  const m = (p - 1) * (q - 1);
  const e = generateMinPrimeFactor(m);
  const d = generateD(e, m);

  return {
    public: {
      e,
      n,
    },
    private: {
      d,
      n,
    },
  };
}

module.exports = { generateKey };
