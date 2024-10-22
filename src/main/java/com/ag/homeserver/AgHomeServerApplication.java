package com.ag.homeserver;

import com.ag.homeserver.external.google.CalendarQuickstart;
import lombok.extern.java.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Log
@SpringBootApplication
public class AgHomeServerApplication {

	public static void main(String[] args) {
		try {
			CalendarQuickstart.test();
			return;
		} catch (IOException | GeneralSecurityException e) {
			log.severe("Failed to test quick start: " + e.getMessage());
		}

		SpringApplication.run(AgHomeServerApplication.class, args);
	}

}
