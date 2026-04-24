const cacheMap = new Map();

function getCache(key) {
  const item = cacheMap.get(key);
  if (!item) return null;
  if (Date.now() > item.expireAt) {
    cacheMap.delete(key);
    return null;
  }
  return item.value;
}

function setCache(key, value, ttlMs = 3000) {
  cacheMap.set(key, { value, expireAt: Date.now() + ttlMs });
}

module.exports = { getCache, setCache };
