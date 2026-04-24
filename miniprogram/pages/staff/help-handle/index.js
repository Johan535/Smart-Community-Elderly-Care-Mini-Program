const { listEmergency, saveEmergency } = require("../../../api/elderApi");
const { requireRole } = require("../../../utils/roleGuard");

Page({
  data: { records: [] },
  async onShow() {
    if (!requireRole("staff")) return;
    const records = await listEmergency();
    this.setData({ records });
  },
  async finish(e) {
    const item = this.data.records.find(x => x.id === e.currentTarget.dataset.id);
    if (!item) return;
    await saveEmergency({ ...item, status: "已处理", processLog: "工作人员已响应并处理" });
    this.onShow();
  }
});
