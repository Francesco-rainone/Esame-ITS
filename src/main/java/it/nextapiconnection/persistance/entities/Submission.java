package it.nextapiconnection.persistance.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "submissions")
@Data
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numeroPersone;
    private String spazioSelezionato;
    private String città;
    private String azienda;
    private String email;
    private String descrizione;

    private LocalDateTime dataRegistrazione;
    private String statoApprovazione;
}