export function xorshift32(seed) {
  let x = seed >>> 0; 

  return function () {
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;

    return (x >>> 0) / 4294967296;
  };
}