package com.community.elderly.controller;

import com.community.elderly.model.DomainModels.*;
import com.community.elderly.service.CommunityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CommunityController {
    private final CommunityService service;

    public CommunityController(CommunityService service) {
        this.service = service;
    }

    @GetMapping("/elders")
    public List<Elder> listElders() { return service.listElders(); }

    @PostMapping("/elders")
    public Elder saveElder(@RequestBody Elder elder) { return service.saveElder(elder); }

    @PostMapping("/elders/{id}/risk")
    public Elder markRisk(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        return service.markRisk(id, payload.getOrDefault("highRisk", false));
    }

    @GetMapping("/health")
    public List<HealthRecord> listHealth() { return service.listHealthRecords(); }

    @PostMapping("/health")
    public HealthRecord saveHealth(@RequestBody HealthRecord record) { return service.saveHealthRecord(record); }

    @GetMapping("/services")
    public List<ServiceOrder> listServices() { return service.listServiceOrders(); }

    @PostMapping("/services")
    public ServiceOrder saveService(@RequestBody ServiceOrder order) { return service.saveServiceOrder(order); }

    @PostMapping("/services/{id}/status")
    public ServiceOrder updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return service.updateServiceStatus(id, payload.get("status"), payload.get("assignedWorker"));
    }

    @GetMapping("/emergencies")
    public List<EmergencyRecord> listEmergency() { return service.listEmergencyRecords(); }

    @PostMapping("/emergencies")
    public EmergencyRecord saveEmergency(@RequestBody EmergencyRecord record) { return service.saveEmergency(record); }

    @GetMapping("/activities")
    public List<Activity> listActivities() { return service.listActivities(); }

    @PostMapping("/activities")
    public Activity saveActivity(@RequestBody Activity activity) { return service.saveActivity(activity); }

    @PostMapping("/activities/{id}/signup")
    public Activity signup(@PathVariable Long id) { return service.signupActivity(id); }

    @GetMapping("/posts")
    public List<SocialPost> listPosts() { return service.listPosts(); }

    @PostMapping("/posts")
    public SocialPost savePost(@RequestBody SocialPost post) { return service.savePost(post); }

    @GetMapping("/stats")
    public Map<String, Object> stats() { return service.stats(); }
}
