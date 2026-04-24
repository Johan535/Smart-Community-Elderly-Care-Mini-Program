const { request } = require("../utils/request");

function saveElder(payload) { return request("/elders", "POST", payload); }
function listElders() { return request("/elders", "GET", {}, { useCache: true }); }
function saveHealth(payload) { return request("/health", "POST", payload); }
function listHealth() { return request("/health", "GET", {}, { useCache: true }); }
function submitService(payload) { return request("/services", "POST", payload); }
function listServices() { return request("/services", "GET", {}, { useCache: true }); }
function saveEmergency(payload) { return request("/emergencies", "POST", payload, { timeout: 900 }); }
function listEmergency() { return request("/emergencies", "GET", {}, { useCache: false }); }
function listActivities() { return request("/activities", "GET", {}, { useCache: true }); }
function signupActivity(id) { return request(`/activities/${id}/signup`, "POST"); }
function listPosts() { return request("/posts", "GET", {}, { useCache: true }); }
function publishPost(payload) { return request("/posts", "POST", payload); }

module.exports = {
  saveElder,
  listElders,
  saveHealth,
  listHealth,
  submitService,
  listServices,
  saveEmergency,
  listEmergency,
  listActivities,
  signupActivity,
  listPosts,
  publishPost
};
