package it.nextapiconnection.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import it.nextapiconnection.persistance.entities.AdminUser;
import it.nextapiconnection.repositories.AdminUserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public DataInitializer(AdminUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {
        String defaultUsername = "admin";
        String defaultPassword = "admin";

        if (repo.findByUsername(defaultUsername).isEmpty()) {
            AdminUser admin = new AdminUser();
            admin.setUsername(defaultUsername);
            admin.setPassword(encoder.encode(defaultPassword));
            repo.save(admin);
            System.out.println(">>> Utente admin creato: " + defaultUsername);
        }
    }
}