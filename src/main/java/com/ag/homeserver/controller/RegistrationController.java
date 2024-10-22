package com.ag.homeserver.controller;

import com.ag.homeserver.database.*;
import com.ag.homeserver.util.InputUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Map;
import java.util.Set;

@Log
@Controller
public class RegistrationController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthorityRepository authorityRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AccountRegistryKeyRepository registryKeyRepository;

    @Transactional
    @PostMapping("/register")
    public void validateRegistration(HttpServletResponse response, @RequestParam Map<String, String> params) throws IOException {
        Set<String> expectedParams = Set.of("account_key", "username", "password", "first_name", "last_name", "nick_name", "email");
        Map<String, String> inputs = InputUtil.sanitizeAllHtml(params, expectedParams);
        InputUtil.validateKeysNotNull(Set.of("account_key", "username", "password", "first_name", "last_name"), inputs);
        params = null; // don't accidentally use dirty input

        // confirm account_registry_key is valid
        AccountRegistryKey accountRegistryKey = registryKeyRepository.findById(inputs.get("account_key"))
                .orElseThrow(() -> new RuntimeException("Invalid account registry key."));

        if (null == accountRegistryKey.getUsername()) {
            throw new RuntimeException("Account registry key was already used.");
        } else if (!accountRegistryKey.isEnabled()) {
            throw new RuntimeException("Invalid account registry key.");
        }

        // create user account
        User user = new User();
        user.setUsername(inputs.get("username").trim());
        user.setPassword(passwordEncoder.encode(inputs.get("password")));
        user.setFirstName(inputs.get("first_name").toLowerCase().trim());
        user.setLastName(inputs.get("last_name").toLowerCase().trim());
        user.setNickName(inputs.get("nick_name").toLowerCase().trim());
        user.setEmail(inputs.get("email").trim());
        user.setCreateDtm(Timestamp.from(Instant.now()));
        user.setEnabled(true);
        userRepository.save(user);
        log.info("Enabled User: " + user.toString());

        // configure default authorities
        Authority authority = new Authority(user.getUsername(), AuthorityTypes.USER);
        authorityRepository.save(authority);

        // configure key
        accountRegistryKey.setUsername(user.getUsername());
        accountRegistryKey.setRegisterDtm(Timestamp.from(Instant.now()));
        registryKeyRepository.save(accountRegistryKey);

        response.sendRedirect("/login");
    }

    @GetMapping("/register")
    public void open() {}
}
