export function xorshift32(seed) {
  let x = seed

  return function () {
    x ^= x << 13
    x ^= x >> 17
    x ^= x << 5

    return (x >>> 0) / 4294967296
  };
}