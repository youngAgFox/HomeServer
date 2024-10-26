package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.sql.Timestamp;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
public class WorkoutEntity {
    @Id
    private int workoutId;
    private int workoutTypeId;
    private String username;
    private Timestamp createDate;
    private Timestamp updateDate;
    private boolean active;
    @OneToMany(mappedBy = "workoutTypeId")
    private Collection<WorkoutTypeExerciseXrefEntity> workoutTypeExerciseXrefEntities;
    @OneToMany(mappedBy = "workoutId")
    private Collection<ExerciseResultEntity> exerciseResults;
}
