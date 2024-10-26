package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class WorkoutTypeExerciseXrefEntity {
    @Id
    private int workoutTypeExerciseXrefId;
    private int workoutTypeId;
    private int exerciseId;
    private boolean enabled;
}
