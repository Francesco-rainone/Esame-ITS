package it.nextapiconnection.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import it.nextapiconnection.persistance.entities.AdminUser;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByUsername(String username);
}
