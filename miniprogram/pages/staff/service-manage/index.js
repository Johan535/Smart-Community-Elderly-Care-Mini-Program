const { listServices } = require("../../../api/elderApi");
const { updateServiceStatus } = require("../../../api/staffApi");
const { requireRole } = require("../../../utils/roleGuard");

Page({
  data: { orders: [] },
  async onShow() {
    if (!requireRole("staff")) return;
    const orders = await listServices();
    this.setData({ orders });
  },
  async dispatch(e) {
    await updateServiceStatus(e.currentTarget.dataset.id, { status: "服务中", assignedWorker: "社区人员A" });
    this.onShow();
  }
});
