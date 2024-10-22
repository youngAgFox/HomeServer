package com.ag.homeserver.controller;

import com.ag.homeserver.database.User;
import com.ag.homeserver.database.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.java.Log;
import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.InvocationTargetException;
import java.util.Enumeration;
import java.util.List;

@Controller
@Log
public class HelloController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public void createHome(HttpSession session, @RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {

        Enumeration<String> attrs = session.getAttributeNames();
        log.info("Session attributes:");
        while (attrs.hasMoreElements()) {
            log.info(attrs.nextElement());
        }
        SecurityContext ctx = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        String username = null == ctx ? "anon" : ctx.getAuthentication().getName();
        userRepository.findById(username).ifPresentOrElse(user -> {
            try {
                model.addAttribute("user", PropertyUtils.describe(user));
                log.info("Providing user properties: " + user.toString());
                model.addAttribute("name", user.getUsername());
            } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
                throw new RuntimeException("Failed to describe 'User' bean", e);
            }
        }, () -> log.info("Failed to find user '" + username + "'"));

        model.addAttribute("prods", List.of(new Prod("Tester", 3.53, true), new Prod("car", 55.32, false)));
    }

    @AllArgsConstructor
    @Getter
    private class Prod {
        public String name;
        public Double price;
        public boolean inStock;
    }
}
