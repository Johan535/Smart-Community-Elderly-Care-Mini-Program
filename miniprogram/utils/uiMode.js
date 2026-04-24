const STORAGE_KEY = "largeTextMode";

function getLargeTextMode() {
  return !!wx.getStorageSync(STORAGE_KEY);
}

function setLargeTextMode(enabled) {
  wx.setStorageSync(STORAGE_KEY, !!enabled);
  getApp().globalData.largeTextMode = !!enabled;
}

module.exports = { getLargeTextMode, setLargeTextMode };
