package com.community.elderly.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RoleAuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String role = request.getHeader("X-Role");
        if (role == null || role.isBlank()) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "缺少角色資訊");
            return false;
        }
        if (!"elder".equals(role) && !"staff".equals(role)) {
            response.sendError(HttpStatus.FORBIDDEN.value(), "角色不合法");
            return false;
        }

        String path = request.getRequestURI();
        String method = request.getMethod();
        if (path.matches("^/api/elders/\\d+/risk$") || "/api/stats".equals(path)) {
            if (!"staff".equals(role)) {
                response.sendError(HttpStatus.FORBIDDEN.value(), "無權限存取");
                return false;
            }
        }

        if (path.startsWith("/api/activities") && "POST".equalsIgnoreCase(method) && path.equals("/api/activities")) {
            if (!"staff".equals(role)) {
                response.sendError(HttpStatus.FORBIDDEN.value(), "僅工作人員可發布活動");
                return false;
            }
        }
        return true;
    }
}
