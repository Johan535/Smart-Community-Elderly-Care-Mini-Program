const { listHealth, saveHealth } = require("../../../api/elderApi");
const { requireRole } = require("../../../utils/roleGuard");
const { getLargeTextMode } = require("../../../utils/uiMode");

Page({
  data: {
    form: { type: "", value: "", reminderType: "" },
    records: [],
    largeTextMode: false,
    riskLevel: "低",
    riskHint: "暂无明显风险"
  },
  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },
  async onShow() {
    if (!requireRole("elder")) return;
    const records = await listHealth();
    this.setData({
      records,
      largeTextMode: getLargeTextMode(),
      ...this.calculateRisk(records)
    });
  },
  async save() {
    const elderId = getApp().globalData.activeElderId;
    const abnormal = this.isAbnormal(this.data.form.type, this.data.form.value);
    await saveHealth({ ...this.data.form, elderId, abnormal });
    if (abnormal) {
      wx.showModal({
        title: "健康预警",
        content: "本次录入数据疑似异常，请尽快联系家属或社区工作人员。",
        showCancel: false
      });
    } else {
      wx.showToast({ title: "已录入" });
    }
    this.setData({ form: { type: "", value: "", reminderType: "" } });
    this.onShow();
  },
  isAbnormal(type, value) {
    const safeType = (type || "").trim();
    const safeValue = (value || "").trim();
    if (!safeType || !safeValue) return false;
    if (safeType.includes("血压") && safeValue.includes("/")) {
      const parts = safeValue.split("/");
      const high = Number(parts[0]);
      const low = Number(parts[1]);
      return high >= 140 || low >= 90 || high <= 90 || low <= 60;
    }
    const numericValue = Number(safeValue);
    if (Number.isNaN(numericValue)) return false;
    if (safeType.includes("血糖")) return numericValue >= 11.1 || numericValue <= 3.9;
    if (safeType.includes("心率")) return numericValue >= 110 || numericValue <= 50;
    return false;
  },
  calculateRisk(records) {
    const total = records.length;
    const abnormalCount = records.filter((item) => item.abnormal).length;
    if (total === 0) {
      return { riskLevel: "低", riskHint: "暂无数据，建议先录入日常健康信息" };
    }
    const ratio = abnormalCount / total;
    if (ratio >= 0.5) {
      return { riskLevel: "高", riskHint: "异常记录占比较高，建议尽快就医并通知社区" };
    }
    if (ratio >= 0.2) {
      return { riskLevel: "中", riskHint: "存在一定风险，建议持续观察并按时复诊" };
    }
    return { riskLevel: "低", riskHint: "整体平稳，继续保持规律监测" };
  },
  
});
