const { listElders } = require("../../../api/elderApi");
const { requireRole } = require("../../../utils/roleGuard");
const { getLargeTextMode } = require("../../../utils/uiMode");

Page({
  data: { elders: [], largeTextMode: false },
  async onShow() {
    if (!requireRole("elder")) return;
    const elders = await listElders();
    this.setData({ elders, largeTextMode: getLargeTextMode() });
  },
  setActive(e) {
    getApp().globalData.activeElderId = e.currentTarget.dataset.id;
    wx.showToast({ title: "切换成功" });
  }
});
