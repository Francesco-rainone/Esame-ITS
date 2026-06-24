package it.nextapiconnection.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.nextapiconnection.persistance.entities.AdminUser;
import it.nextapiconnection.repositories.AdminUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean authenticate(String username, String rawPassword) {
        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            return encoder.matches(rawPassword, user.getPassword());
        }
        return false;
    }
}