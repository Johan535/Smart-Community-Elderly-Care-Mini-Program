const { listActivities, signupActivity, listPosts, publishPost } = require("../../../api/elderApi");
const { requireRole } = require("../../../utils/roleGuard");
const { getLargeTextMode } = require("../../../utils/uiMode");

Page({
  data: { activities: [], posts: [], postContent: "", largeTextMode: false },
  async onShow() {
    if (!requireRole("elder")) return;
    const activities = await listActivities();
    const posts = await listPosts();
    this.setData({ activities, posts, largeTextMode: getLargeTextMode() });
  },
  onPostInput(e) { this.setData({ postContent: e.detail.value }); },
  async signup(e) {
    await signupActivity(e.currentTarget.dataset.id);
    wx.showToast({ title: "报名成功" });
    this.onShow();
  },
  async publishPost() {
    const elderId = getApp().globalData.activeElderId;
    await publishPost({ elderId, content: this.data.postContent, createTime: new Date().toISOString() });
    wx.showToast({ title: "发布成功" });
    this.onShow();
  }
});
