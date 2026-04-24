const { saveElder } = require("../../../api/elderApi");
const { requireRole } = require("../../../utils/roleGuard");
const { getLargeTextMode, setLargeTextMode } = require("../../../utils/uiMode");

Page({
  onShow() {
    if (!requireRole("elder")) return;
    this.setData({ largeTextMode: getLargeTextMode() });
  },
  data: {
    largeTextMode: false,
    form: {
      name: "",
      age: "",
      gender: "",
      emergencyContact: "",
      photoUrl: ""
    }
  },
  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({ "form.photoUrl": res.tempFilePaths[0] });
      }
    });
  },
  async save() {
    await saveElder(this.data.form);
    wx.showToast({ title: "保存成功" });
  },
  toggleLargeTextMode() {
    const next = !this.data.largeTextMode;
    setLargeTextMode(next);
    this.setData({ largeTextMode: next });
    wx.showToast({ title: next ? "已开启大字模式" : "已关闭大字模式", icon: "none" });
  },
  goSwitch() { wx.navigateTo({ url: "/pages/elder/elder-switch/index" }); },
  goHealth() { wx.navigateTo({ url: "/pages/elder/health/index" }); },
  goService() { wx.navigateTo({ url: "/pages/elder/service/index" }); },
  goEmergency() { wx.navigateTo({ url: "/pages/elder/emergency-help/index" }); },
  goActivity() { wx.navigateTo({ url: "/pages/elder/activity/index" }); }
});
