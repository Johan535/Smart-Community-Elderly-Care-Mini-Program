package com.community.elderly.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;

@Component
public class RequestSignInterceptor implements HandlerInterceptor {
    private static final String SIGN_SECRET = "community-elderly-2026";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String timestamp = request.getHeader("X-Timestamp");
        String nonce = request.getHeader("X-Nonce");
        String sign = request.getHeader("X-Signature");
        if (timestamp == null || nonce == null || sign == null) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "缺少簽章資訊");
            return false;
        }

        long ts = Long.parseLong(timestamp);
        long now = Instant.now().toEpochMilli();
        if (Math.abs(now - ts) > 60_000) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "請求已過期");
            return false;
        }

        String payload = request.getMethod() + "|" + request.getRequestURI() + "|" + timestamp + "|" + nonce + "|" + SIGN_SECRET;
        String expected = sha256(payload);
        if (!expected.equals(sign)) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "簽章驗證失敗");
            return false;
        }
        return true;
    }

    private String sha256(String raw) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(raw.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
