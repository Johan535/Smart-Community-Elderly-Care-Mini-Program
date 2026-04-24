Page({
  goElder() {
    getApp().globalData.role = "elder";
    wx.navigateTo({ url: "/pages/elder/personal/index" });
  },
  goStaff() {
    getApp().globalData.role = "staff";
    wx.navigateTo({ url: "/pages/staff/archive-manage/index" });
  }
});
