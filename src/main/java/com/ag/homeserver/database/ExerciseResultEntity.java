package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.extern.java.Log;

import java.sql.Timestamp;

@Log
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class ExerciseResultEntity {
    @Id
    private int exerciseResultId;
    private int exerciseId;
    private int workoutId;
    private String username;
    private double mass;
    private String measurementType;
    private int repetitions;
    private int sets;
    private Timestamp createDate;
    private Timestamp updateDate;
    private boolean enabled;
}
