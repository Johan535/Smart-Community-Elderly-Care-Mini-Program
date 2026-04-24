const app = getApp();
const { signRequest } = require("./signature");
const { getCache, setCache } = require("./cache");

function request(url, method = "GET", data = {}, options = {}) {
  const role = app.globalData.role || "elder";
  const cacheKey = `${method}:${url}:${JSON.stringify(data)}`;
  const useCache = method === "GET" && options.useCache !== false;
  if (useCache) {
    const cached = getCache(cacheKey);
    if (cached) return Promise.resolve(cached);
  }

  const timestamp = Date.now().toString();
  const nonce = `${Math.random()}`.slice(2, 10);
  const sign = signRequest(method, `/api${url}`, timestamp, nonce);

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBase}${url}`,
      method,
      data,
      timeout: options.timeout || 3000,
      header: {
        "X-Role": role,
        "X-Timestamp": timestamp,
        "X-Nonce": nonce,
        "X-Signature": sign
      },
      success: (res) => {
        if (res.statusCode >= 400) {
          reject(new Error(res.data && res.data.message ? res.data.message : "请求失败"));
          return;
        }
        if (useCache) setCache(cacheKey, res.data, 3000);
        resolve(res.data);
      },
      fail: (err) => reject(err)
    });
  });
}

module.exports = { request };
