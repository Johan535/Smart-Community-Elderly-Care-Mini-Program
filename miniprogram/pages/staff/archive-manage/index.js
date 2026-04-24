const { listElders } = require("../../../api/elderApi");
const { markRisk } = require("../../../api/staffApi");
const { requireRole } = require("../../../utils/roleGuard");

Page({
  data: { elders: [] },
  async onShow() {
    if (!requireRole("staff")) return;
    const elders = await listElders();
    this.setData({ elders });
  },
  async setRisk(e) {
    await markRisk(e.currentTarget.dataset.id, e.currentTarget.dataset.risk);
    this.onShow();
  },
  goService() { wx.navigateTo({ url: "/pages/staff/service-manage/index" }); },
  goActivity() { wx.navigateTo({ url: "/pages/staff/activity-manage/index" }); },
  goHelp() { wx.navigateTo({ url: "/pages/staff/help-handle/index" }); },
  goStats() { wx.navigateTo({ url: "/pages/staff/stats/index" }); }
});
