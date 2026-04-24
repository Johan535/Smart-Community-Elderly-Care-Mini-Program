const { queryStats } = require("../../../api/staffApi");
const { requireRole } = require("../../../utils/roleGuard");

Page({
  data: { stats: {} },
  async onShow() {
    if (!requireRole("staff")) return;
    const stats = await queryStats();
    this.setData({ stats });
  },
  genReport() {
    wx.showModal({ title: "报表", content: "已生成日/周/月报（基础版）", showCancel: false });
  }
});
