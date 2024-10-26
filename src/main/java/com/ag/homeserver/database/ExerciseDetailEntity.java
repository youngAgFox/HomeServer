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
public class ExerciseDetailEntity {
    @Id
    private int exerciseDetailId;
    private int exerciseId;
    private String infoType;
    private String value;
    private int orderNumber;
    private boolean enabled;
}
