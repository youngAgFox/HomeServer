package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class MeasurementTypeEntity {
    @Id
    private String measurementType;
    private String measurementTypeName;
    private String unitType;
    private boolean enabled;
}
