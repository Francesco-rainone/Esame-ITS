package it.nextapiconnection.repositories; // Assicurati che il package sia corretto

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import it.nextapiconnection.persistance.entities.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

}