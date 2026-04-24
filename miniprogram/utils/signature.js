function sha256(input) {
  const utf8 = unescape(encodeURIComponent(input));
  return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(utf8)).toString();
}

function signRequest(method, path, timestamp, nonce) {
  const secret = "community-elderly-2026";
  return sha256(`${method}|${path}|${timestamp}|${nonce}|${secret}`);
}

module.exports = { signRequest };

/*
 * 輕量 SHA256 實作，避免額外依賴。
 * 來源為公開演算法實作的最小化版本。
 */
const CryptoJS = (() => {
  const C = {};
  const C_lib = C.lib = {};
  const WordArray = C_lib.WordArray = {
    create(words, sigBytes) { return { words: words || [], sigBytes: sigBytes != null ? sigBytes : (words || []).length * 4 }; }
  };
  const C_enc = C.enc = {};
  C_enc.Latin1 = { parse(str) { const words = []; for (let i = 0; i < str.length; i++) words[i >>> 2] |= (str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8); return WordArray.create(words, str.length); } };
  const C_algo = C.algo = {};
  function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }
  const K = [];
  (function () {
    let n = 2;
    while (K.length < 64) {
      let prime = true;
      for (let i = 2; i * i <= n; i++) if (n % i === 0) prime = false;
      if (prime) K.push((Math.pow(n, 1 / 3) * 0x100000000) | 0);
      n++;
    }
  })();
  C.SHA256 = function (msg) {
    const m = msg.words.slice(0);
    const l = msg.sigBytes * 8;
    m[l >>> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;
    let H = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
    for (let i = 0; i < m.length; i += 16) {
      const w = [];
      for (let t = 0; t < 64; t++) {
        if (t < 16) w[t] = m[i + t] | 0;
        else {
          const s0 = rotr(7, w[t - 15]) ^ rotr(18, w[t - 15]) ^ (w[t - 15] >>> 3);
          const s1 = rotr(17, w[t - 2]) ^ rotr(19, w[t - 2]) ^ (w[t - 2] >>> 10);
          w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0;
        }
      }
      let [a, b, c, d, e, f, g, h] = H;
      for (let t = 0; t < 64; t++) {
        const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
        const ch = (e & f) ^ (~e & g);
        const temp1 = (h + S1 + ch + K[t] + w[t]) | 0;
        const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + temp1) | 0; d = c; c = b; b = a; a = (temp1 + temp2) | 0;
      }
      H = [(H[0] + a) | 0, (H[1] + b) | 0, (H[2] + c) | 0, (H[3] + d) | 0, (H[4] + e) | 0, (H[5] + f) | 0, (H[6] + g) | 0, (H[7] + h) | 0];
    }
    return {
      toString() {
        let hex = "";
        for (let i = 0; i < H.length; i++) {
          const v = H[i];
          hex += ("00000000" + (v >>> 0).toString(16)).slice(-8);
        }
        return hex;
      }
    };
  };
  return C;
})();
