package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class ExerciseEntity {
    @Id
    private int exerciseId;
    private String name;
    private String url;
    private String targetMuscleGroup;
    private String exerciseType;
    private String equipmentRequired;
    private String mechanics;
    private String forceType;
    private String experienceLevel;
}
