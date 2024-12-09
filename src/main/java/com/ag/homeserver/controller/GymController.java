package com.ag.homeserver.controller;

import com.ag.homeserver.database.ExerciseRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Log
@Controller
public class GymController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/home/gym")
    public void setupGymModel(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        String username = userDetails.getUsername();
        // populate recent and saved workout lists

        // make sure the recent list has the workout to resume listed at the top
    }
}
