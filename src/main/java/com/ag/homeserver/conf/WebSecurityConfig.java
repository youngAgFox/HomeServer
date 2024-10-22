package com.ag.homeserver.conf;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired
	DataSource dataSource;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new DelegatingPasswordEncoder("bcrypt", Map.of("bcrypt", new BCryptPasswordEncoder(12)));
	}

    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((requests) -> requests
//							.anyRequest().permitAll()
				.requestMatchers("/", "/register", "/error", "/static/images/**", "/static/css/**",
						"/static/scripts/register-validate.js", "/static/scripts/errors.js", "/static/fonts/**").permitAll()
				.requestMatchers("/home/**", "/static/scripts/**").authenticated()
				.requestMatchers("/admin").hasAuthority("admin")
			)
			.formLogin((form) -> form
				.defaultSuccessUrl("/home/home")
				.loginPage("/login")
				.permitAll()
			)
			.logout((logout) -> logout.logoutUrl("/logout")
					.logoutSuccessUrl("/login?logout")
					.invalidateHttpSession(true)
					.deleteCookies("JSESSIONID")
					.permitAll());
		return http.build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
		manager.setEnableGroups(false);
		return manager;
	}
}
