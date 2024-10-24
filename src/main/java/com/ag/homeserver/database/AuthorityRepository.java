package com.ag.homeserver.database;

import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepository extends CrudRepository<AuthorityEntity, String> {
    // auto implemented by spring
}
