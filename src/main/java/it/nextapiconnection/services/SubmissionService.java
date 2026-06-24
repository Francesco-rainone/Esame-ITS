package it.nextapiconnection.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.nextapiconnection.persistance.entities.Submission;
import it.nextapiconnection.repositories.SubmissionRepository;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission save(Submission submission) {
        return submissionRepository.save(submission);
    }

    public List<Submission> findAll() {
        return submissionRepository.findAll();
    }

    public Optional<Submission> updateStatus(Long id, String nuovoStato) {
        Optional<Submission> submissionOpt = submissionRepository.findById(id);
        if (submissionOpt.isPresent()) {
            Submission submission = submissionOpt.get();
            submission.setStatoApprovazione(nuovoStato);
            return Optional.of(submissionRepository.save(submission));
        }
        return Optional.empty();
    }

    public boolean deleteById(Long id) {
        if (submissionRepository.existsById(id)) {
            submissionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}