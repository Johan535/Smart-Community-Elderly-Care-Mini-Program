function requireRole(expectRole) {
  const role = getApp().globalData.role;
  if (role !== expectRole) {
    wx.showToast({ title: "角色权限不足", icon: "none" });
    wx.reLaunch({ url: "/pages/index/index" });
    return false;
  }
  return true;
}

module.exports = { requireRole };
