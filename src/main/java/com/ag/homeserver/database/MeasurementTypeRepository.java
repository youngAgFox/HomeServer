package com.ag.homeserver.database;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MeasurementTypeRepository extends CrudRepository<MeasurementTypeEntity, String> {
    List<MeasurementTypeEntity> findAllByUnitType(String unitType);
}
