package it.nextapiconnection.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import it.nextapiconnection.services.AuthService;
import lombok.Data;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean success = authService.authenticate(request.getUsername(), request.getPassword());
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(401).body("Credenziali errate");
        }
    }
}