const { listServices, submitService } = require("../../../api/elderApi");
const { request } = require("../../../utils/request");
const { requireRole } = require("../../../utils/roleGuard");
const { getLargeTextMode } = require("../../../utils/uiMode");

Page({
  data: { form: { serviceType: "", timeSlot: "", detail: "" }, orders: [], largeTextMode: false },
  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },
  async onShow() {
    if (!requireRole("elder")) return;
    const orders = await listServices();
    this.setData({ orders, largeTextMode: getLargeTextMode() });
  },
  async submitOrder() {
    const elderId = getApp().globalData.activeElderId;
    await submitService({ ...this.data.form, elderId });
    wx.showToast({ title: "预约成功" });
    this.onShow();
  },
  async onFeedback(e) {
    const id = e.currentTarget.dataset.id;
    const complaint = e.detail.value;
    await request(`/services/${id}/status`, "POST", { status: "已评价", assignedWorker: "", complaint });
  }
});
