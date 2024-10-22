package com.ag.homeserver.database;

import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepository extends CrudRepository<Authority, String> {
    // auto implemented by spring
}
