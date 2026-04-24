package com.community.elderly.model;

import lombok.Data;

import java.time.LocalDateTime;

public class DomainModels {
    @Data
    public static class Elder {
        private Long id;
        private String name;
        private Integer age;
        private String gender;
        private Double height;
        private Double weight;
        private String medicalHistory;
        private String allergyHistory;
        private String emergencyContact;
        private String photoUrl;
        private boolean highRisk;
    }

    @Data
    public static class HealthRecord {
        private Long id;
        private Long elderId;
        private String type;
        private String value;
        private String remark;
        private LocalDateTime recordTime;
        private boolean abnormal;
        private String reminderType;
        private LocalDateTime reminderTime;
    }

    @Data
    public static class ServiceOrder {
        private Long id;
        private Long elderId;
        private String serviceType;
        private String detail;
        private String timeSlot;
        private String status;
        private String assignedWorker;
        private String evaluation;
        private String complaint;
    }

    @Data
    public static class EmergencyRecord {
        private Long id;
        private Long elderId;
        private String location;
        private String message;
        private String status;
        private String processLog;
        private LocalDateTime createTime;
    }

    @Data
    public static class Activity {
        private Long id;
        private String title;
        private String category;
        private String content;
        private String activityTime;
        private String status;
        private Integer signupCount;
    }

    @Data
    public static class SocialPost {
        private Long id;
        private Long elderId;
        private String content;
        private String createTime;
    }
}
