const { request } = require("../utils/request");

function markRisk(id, highRisk) { return request(`/elders/${id}/risk`, "POST", { highRisk }); }
function updateServiceStatus(id, payload) { return request(`/services/${id}/status`, "POST", payload); }
function publishActivity(payload) { return request("/activities", "POST", payload); }
function queryStats() { return request("/stats", "GET", {}, { useCache: false }); }

module.exports = { markRisk, updateServiceStatus, publishActivity, queryStats };
