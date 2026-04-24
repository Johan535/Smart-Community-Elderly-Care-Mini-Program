package com.community.elderly.service;

import com.community.elderly.model.DomainModels.*;
import com.community.elderly.repository.MemoryRepository;
import com.community.elderly.security.CryptoUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommunityService {
    private final MemoryRepository repository;

    public CommunityService(MemoryRepository repository) {
        this.repository = repository;
    }

    public List<Elder> listElders() {
        return repository.listElders().stream().map(this::decryptElder).toList();
    }

    public Elder saveElder(Elder elder) {
        Elder encrypted = encryptElder(elder);
        Elder saved = repository.saveElder(encrypted);
        return decryptElder(saved);
    }
    public Elder markRisk(Long id, boolean risk) {
        Elder elder = repository.getElder(id).orElseThrow();
        elder.setHighRisk(risk);
        return decryptElder(repository.saveElder(elder));
    }

    public List<HealthRecord> listHealthRecords() { return repository.listHealth(); }
    public HealthRecord saveHealthRecord(HealthRecord record) {
        if (record.getRecordTime() == null) record.setRecordTime(LocalDateTime.now());
        return repository.saveHealth(record);
    }

    public List<ServiceOrder> listServiceOrders() { return repository.listServices(); }
    public ServiceOrder saveServiceOrder(ServiceOrder order) {
        if (order.getStatus() == null || order.getStatus().isBlank()) order.setStatus("待接单");
        return repository.saveService(order);
    }
    public ServiceOrder updateServiceStatus(Long id, String status, String worker) {
        ServiceOrder order = repository.getService(id).orElseThrow();
        order.setStatus(status);
        order.setAssignedWorker(worker);
        return repository.saveService(order);
    }

    public List<EmergencyRecord> listEmergencyRecords() { return repository.listEmergencies(); }
    public EmergencyRecord saveEmergency(EmergencyRecord record) {
        if (record.getCreateTime() == null) record.setCreateTime(LocalDateTime.now());
        if (record.getStatus() == null || record.getStatus().isBlank()) record.setStatus("已发起");
        return repository.saveEmergency(record);
    }

    public List<Activity> listActivities() { return repository.listActivities(); }
    public Activity saveActivity(Activity activity) {
        if (activity.getStatus() == null || activity.getStatus().isBlank()) activity.setStatus("报名中");
        if (activity.getSignupCount() == null) activity.setSignupCount(0);
        return repository.saveActivity(activity);
    }
    public Activity signupActivity(Long id) {
        Activity activity = repository.getActivity(id).orElseThrow();
        activity.setSignupCount(activity.getSignupCount() + 1);
        return repository.saveActivity(activity);
    }

    public List<SocialPost> listPosts() { return repository.listPosts(); }
    public SocialPost savePost(SocialPost post) { return repository.savePost(post); }

    public Map<String, Object> stats() {
        Map<String, Object> data = new HashMap<>();
        data.put("elderCount", repository.listElders().size());
        data.put("healthRecordCount", repository.listHealth().size());
        data.put("serviceOrderCount", repository.listServices().size());
        data.put("emergencyCount", repository.listEmergencies().size());
        data.put("activityCount", repository.listActivities().size());
        return data;
    }

    private Elder encryptElder(Elder elder) {
        Elder target = new Elder();
        target.setId(elder.getId());
        target.setName(CryptoUtil.encrypt(elder.getName()));
        target.setAge(elder.getAge());
        target.setGender(elder.getGender());
        target.setHeight(elder.getHeight());
        target.setWeight(elder.getWeight());
        target.setMedicalHistory(CryptoUtil.encrypt(elder.getMedicalHistory()));
        target.setAllergyHistory(CryptoUtil.encrypt(elder.getAllergyHistory()));
        target.setEmergencyContact(CryptoUtil.encrypt(elder.getEmergencyContact()));
        target.setPhotoUrl(CryptoUtil.encrypt(elder.getPhotoUrl()));
        target.setHighRisk(elder.isHighRisk());
        return target;
    }

    private Elder decryptElder(Elder elder) {
        Elder target = new Elder();
        target.setId(elder.getId());
        target.setName(CryptoUtil.decrypt(elder.getName()));
        target.setAge(elder.getAge());
        target.setGender(elder.getGender());
        target.setHeight(elder.getHeight());
        target.setWeight(elder.getWeight());
        target.setMedicalHistory(CryptoUtil.decrypt(elder.getMedicalHistory()));
        target.setAllergyHistory(CryptoUtil.decrypt(elder.getAllergyHistory()));
        target.setEmergencyContact(CryptoUtil.decrypt(elder.getEmergencyContact()));
        target.setPhotoUrl(CryptoUtil.decrypt(elder.getPhotoUrl()));
        target.setHighRisk(elder.isHighRisk());
        return target;
    }
}
