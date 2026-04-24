package com.community.elderly.repository;

import com.community.elderly.model.DomainModels.*;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class MemoryRepository {
    private final Map<Long, Elder> elders = new ConcurrentHashMap<>();
    private final Map<Long, HealthRecord> healthRecords = new ConcurrentHashMap<>();
    private final Map<Long, ServiceOrder> serviceOrders = new ConcurrentHashMap<>();
    private final Map<Long, EmergencyRecord> emergencyRecords = new ConcurrentHashMap<>();
    private final Map<Long, Activity> activities = new ConcurrentHashMap<>();
    private final Map<Long, SocialPost> socialPosts = new ConcurrentHashMap<>();

    private final AtomicLong elderId = new AtomicLong(1);
    private final AtomicLong healthId = new AtomicLong(1);
    private final AtomicLong serviceId = new AtomicLong(1);
    private final AtomicLong emergencyId = new AtomicLong(1);
    private final AtomicLong activityId = new AtomicLong(1);
    private final AtomicLong postId = new AtomicLong(1);

    public List<Elder> listElders() { return new ArrayList<>(elders.values()); }
    public Elder saveElder(Elder elder) {
        if (elder.getId() == null) elder.setId(elderId.getAndIncrement());
        elders.put(elder.getId(), elder);
        return elder;
    }
    public Optional<Elder> getElder(Long id) { return Optional.ofNullable(elders.get(id)); }

    public List<HealthRecord> listHealth() { return new ArrayList<>(healthRecords.values()); }
    public HealthRecord saveHealth(HealthRecord record) {
        if (record.getId() == null) record.setId(healthId.getAndIncrement());
        healthRecords.put(record.getId(), record);
        return record;
    }

    public List<ServiceOrder> listServices() { return new ArrayList<>(serviceOrders.values()); }
    public ServiceOrder saveService(ServiceOrder order) {
        if (order.getId() == null) order.setId(serviceId.getAndIncrement());
        serviceOrders.put(order.getId(), order);
        return order;
    }
    public Optional<ServiceOrder> getService(Long id) { return Optional.ofNullable(serviceOrders.get(id)); }

    public List<EmergencyRecord> listEmergencies() { return new ArrayList<>(emergencyRecords.values()); }
    public EmergencyRecord saveEmergency(EmergencyRecord record) {
        if (record.getId() == null) record.setId(emergencyId.getAndIncrement());
        emergencyRecords.put(record.getId(), record);
        return record;
    }

    public List<Activity> listActivities() { return new ArrayList<>(activities.values()); }
    public Activity saveActivity(Activity activity) {
        if (activity.getId() == null) activity.setId(activityId.getAndIncrement());
        activities.put(activity.getId(), activity);
        return activity;
    }
    public Optional<Activity> getActivity(Long id) { return Optional.ofNullable(activities.get(id)); }

    public List<SocialPost> listPosts() { return new ArrayList<>(socialPosts.values()); }
    public SocialPost savePost(SocialPost post) {
        if (post.getId() == null) post.setId(postId.getAndIncrement());
        socialPosts.put(post.getId(), post);
        return post;
    }
}
