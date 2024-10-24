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
public class ExerciseInfoEntity {
    @Id
    private int exerciseInfoId;
    private int exerciseId;
    private String infoType;
    private String value;
    private int orderNumber;
    private boolean enabled;
}
