package com.ag.homeserver.database;

import org.springframework.data.repository.CrudRepository;

public interface AccountRegistryKeyRepository extends CrudRepository<AccountRegistryKeyEntity, String> {
    // auto implemented by spring
}
