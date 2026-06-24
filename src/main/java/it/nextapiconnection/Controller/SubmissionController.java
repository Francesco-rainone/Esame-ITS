package it.nextapiconnection.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import it.nextapiconnection.persistance.entities.Submission;
import it.nextapiconnection.services.SubmissionService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/richieste")
@Slf4j
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PATCH,
                RequestMethod.DELETE
        }
)
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @Data
    @NoArgsConstructor
    public static class CandidaturaDTO {
        private int numeroPersone;
        private String spazioSelezionato;
        private String città;
        private String azienda;
        private String email;
        private String descrizione;
    }

    @Data
    @AllArgsConstructor
    public static class SubmissionResult {
        private Long id;
        private int numeroPersone;
        private LocalDateTime dataRegistrazione;
    }

    @PostMapping
    public ResponseEntity<SubmissionResult> submit(@RequestBody CandidaturaDTO candidatura) {
        log.info("Nuova candidatura ricevuta: {}", candidatura);

        Submission newSubmission = new Submission();
        newSubmission.setNumeroPersone(candidatura.getNumeroPersone());
        newSubmission.setSpazioSelezionato(candidatura.getSpazioSelezionato());
        newSubmission.setCittà(candidatura.getCittà());
        newSubmission.setAzienda(candidatura.getAzienda());
        newSubmission.setEmail(candidatura.getEmail());
        newSubmission.setDescrizione(candidatura.getDescrizione());

        newSubmission.setDataRegistrazione(LocalDateTime.now()); // Uso di java.time.LocalDateTime
        newSubmission.setStatoApprovazione("In Attesa");

        Submission savedEntity = submissionService.save(newSubmission);
        log.info("Candidatura salvata con ID: {}", savedEntity.getId());

        SubmissionResult result = new SubmissionResult(
                savedEntity.getId(),
                savedEntity.getNumeroPersone(),
                savedEntity.getDataRegistrazione()
        );

        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<Submission>> getAll() {
        log.info("Richiesta per ottenere tutte le candidature.");
        List<Submission> submissions = submissionService.findAll();
        return ResponseEntity.ok(submissions);
    }

    @Data
    public static class UpdateStatusDTO {
        private String stato;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Submission> updateSubmissionStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusDTO statusUpdateDTO) {

        log.info("Richiesta di aggiornamento stato per ID: {} con nuovo stato: {}", id, statusUpdateDTO.getStato());

        return submissionService.updateStatus(id, statusUpdateDTO.getStato())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable Long id) {
        log.info("Richiesta di cancellazione per ID: {}", id);

        boolean deleted = submissionService.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
