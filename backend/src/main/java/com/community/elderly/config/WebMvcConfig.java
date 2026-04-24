package com.community.elderly.config;

import com.community.elderly.security.RequestSignInterceptor;
import com.community.elderly.security.RoleAuthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final RoleAuthInterceptor roleAuthInterceptor;
    private final RequestSignInterceptor requestSignInterceptor;

    public WebMvcConfig(RoleAuthInterceptor roleAuthInterceptor, RequestSignInterceptor requestSignInterceptor) {
        this.roleAuthInterceptor = roleAuthInterceptor;
        this.requestSignInterceptor = requestSignInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestSignInterceptor).addPathPatterns("/api/**");
        registry.addInterceptor(roleAuthInterceptor).addPathPatterns("/api/**");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedMethods("*");
    }
}
