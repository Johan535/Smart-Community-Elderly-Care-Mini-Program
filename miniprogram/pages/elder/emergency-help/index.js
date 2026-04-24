const { listEmergency, saveEmergency } = require("../../../api/elderApi");
const { requireRole } = require("../../../utils/roleGuard");
const { getLargeTextMode } = require("../../../utils/uiMode");

Page({
  data: { location: "", message: "", records: [], largeTextMode: false },
  onLocation(e) { this.setData({ location: e.detail.value }); },
  onMessage(e) { this.setData({ message: e.detail.value }); },
  async onShow() {
    if (!requireRole("elder")) return;
    const records = await listEmergency();
    this.setData({ records, largeTextMode: getLargeTextMode() });
  },
  async help() {
    const elderId = getApp().globalData.activeElderId;
    await saveEmergency({ elderId, location: this.data.location, message: this.data.message });
    wx.showToast({ title: "已发送" });
    this.onShow();
  }
});
