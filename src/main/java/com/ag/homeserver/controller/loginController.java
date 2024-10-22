package com.ag.homeserver.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class loginController {

    @GetMapping("login")
    public String doRedirectIfAuthenticated(HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        if (null != userDetails) {
            // redirect to home page
            return "redirect:/home/home";
        }
        return null;
    }

}
