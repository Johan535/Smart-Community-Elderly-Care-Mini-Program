const { listActivities } = require("../../../api/elderApi");
const { publishActivity } = require("../../../api/staffApi");
const { requireRole } = require("../../../utils/roleGuard");

Page({
  data: { form: { title: "", activityTime: "" }, activities: [] },
  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },
  async onShow() {
    if (!requireRole("staff")) return;
    const activities = await listActivities();
    this.setData({ activities });
  },
  async publish() {
    await publishActivity({ ...this.data.form, category: "社区活动", content: "活动通知" });
    this.onShow();
  },
  exportData() {
    wx.showModal({ title: "导出结果", content: "已导出为基础文本数据（阶段一）", showCancel: false });
  }
});
